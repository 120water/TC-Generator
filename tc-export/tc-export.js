/**
 * TC Export to Zephyr – manage test cases and export selected to canonical CSV.
 * Canonical columns per ZephyrTestCaseGuidelines §8.1 (one row per step).
 */

const CSV_COLUMNS = [
    'Name',
    'Status',
    'Precondition',
    'Objective',
    'Priority',
    'Labels',
    'Estimated Time',
    'Automated',
    'Automation Possible',
    'Created in Version',
    'Test Script (Step-by-Step) - Step',
    'Test Script (Step-by-Step) - Test Data',
    'Test Script (Step-by-Step) - Expected Result'
];

const DEFAULT_VERSION = '26.1.0.0';

let testCases = [];

const tcListEl = document.getElementById('tcList');
const emptyStateEl = document.getElementById('emptyState');
const tcCountEl = document.getElementById('tcCount');
const selectAllEl = document.getElementById('selectAll');
const btnExportCsv = document.getElementById('btnExportCsv');

function normalizeTc(tc) {
    return {
        id: tc.id || 'tc-' + Date.now() + '-' + Math.random().toString(36).slice(2, 9),
        name: String(tc.name || '').trim(),
        status: tc.status || 'Draft',
        precondition: String(tc.precondition || '').trim(),
        objective: String(tc.objective || '').trim(),
        priority: tc.priority || 'Normal',
        labels: tc.labels || 'functional_test',
        estimatedTime: tc.estimatedTime || tc.estimated_time || '00:05',
        automated: tc.automated || 'No',
        automationPossible: tc.automationPossible ?? 'No',
        createdInVersion: tc.createdInVersion || tc.created_in_version || DEFAULT_VERSION,
        steps: Array.isArray(tc.steps) ? tc.steps.map(s => ({
            step: String(s.step || '').trim(),
            testData: String(s.testData ?? s.test_data ?? '').trim(),
            expectedResult: String(s.expectedResult ?? s.expected_result ?? '').trim()
        })) : []
    };
}

function renderTcList() {
    const hasItems = testCases.length > 0;
    emptyStateEl.classList.toggle('hidden', hasItems);
    tcCountEl.textContent = testCases.length;
    btnExportCsv.disabled = !hasItems || !testCases.some(tc => tc.selected);

    if (!hasItems) {
        tcListEl.querySelectorAll('.tc-card').forEach(c => c.remove());
        return;
    }

    const existingIds = new Set(Array.from(tcListEl.querySelectorAll('.tc-card')).map(c => c.dataset.id));
    const currentIds = new Set(testCases.map(tc => tc.id));

    testCases.forEach(tc => {
        let card = tcListEl.querySelector(`[data-id="${tc.id}"]`);
        if (!card) {
            card = document.createElement('div');
            card.className = 'tc-card';
            card.dataset.id = tc.id;
            tcListEl.appendChild(card);
        }
        card.classList.toggle('selected', !!tc.selected);
        card.innerHTML = `
            <input type="checkbox" class="tc-checkbox" ${tc.selected ? 'checked' : ''} data-id="${tc.id}" aria-label="Select for export">
            <div class="tc-body">
                <div class="tc-title">${escapeHtml(tc.name)}</div>
                <div class="tc-meta">
                    <span>${escapeHtml(tc.labels)}</span>
                    <span>${escapeHtml(tc.estimatedTime)}</span>
                    <span>${tc.steps.length} step(s)</span>
                </div>
            </div>
            <div class="tc-actions">
                <button type="button" class="btn btn-secondary btn-view" data-id="${tc.id}">View details</button>
            </div>
        `;

        card.querySelector('.tc-checkbox').addEventListener('change', (e) => {
            const t = testCases.find(x => x.id === tc.id);
            if (t) t.selected = e.target.checked;
            renderTcList();
        });
        card.querySelector('.btn-view').addEventListener('click', () => openViewModal(tc));
    });

    tcListEl.querySelectorAll('.tc-card').forEach(card => {
        if (!currentIds.has(card.dataset.id)) card.remove();
    });
}

function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
}

function copyableRow(label, value) {
    const v = value != null && value !== '' ? String(value) : '—';
    return `<dt>${escapeHtml(label)}</dt><dd class="view-copy-wrap"><span class="view-value">${escapeHtml(v)}</span> <button class="btn-copy-value" type="button" aria-label="Copy">Copy</button></dd>`;
}

function plainRow(label, value) {
    const v = value != null && value !== '' ? String(value) : '—';
    return `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(v)}</dd>`;
}

function copyableCell(value) {
    const v = value != null && value !== '' ? String(value) : '';
    return `<span class="view-value">${escapeHtml(v)}</span> <button class="btn-copy-value" type="button" aria-label="Copy">Copy</button>`;
}

function openViewModal(tc) {
    const titleEl = document.getElementById('viewModalTitle');
    const bodyEl = document.getElementById('viewModalBody');
    if (!titleEl || !bodyEl) return;
    titleEl.textContent = tc.name;

    const detailsHtml = [
        copyableRow('Name', tc.name),
        copyableRow('Objective', tc.objective),
        copyableRow('Precondition', tc.precondition),
        plainRow('Status', tc.status),
        plainRow('Priority', tc.priority),
        plainRow('Labels', tc.labels),
        copyableRow('Estimated Time', tc.estimatedTime),
        plainRow('Created in Version', tc.createdInVersion),
        plainRow('Automated', tc.automated),
        plainRow('Automation Possible', tc.automationPossible)
    ].join('');

    const stepsHtml = (tc.steps || []).map((s, i) => `
        <tr>
            <td class="view-step-num">${i + 1}</td>
            <td class="view-step-action"><div class="view-copy-wrap">${copyableCell(s.step)}</div></td>
            <td class="view-step-data"><div class="view-copy-wrap">${copyableCell(s.testData)}</div></td>
            <td class="view-step-expected"><div class="view-copy-wrap">${copyableCell(s.expectedResult)}</div></td>
        </tr>
    `).join('');

    bodyEl.innerHTML = `
        <section class="view-section">
            <h4>Details</h4>
            <dl class="view-dl">${detailsHtml}</dl>
        </section>
        <section class="view-section">
            <h4>Test Script (Steps)</h4>
            <table class="view-steps-table">
                <thead>
                    <tr><th>#</th><th>Step</th><th>Test Data</th><th>Expected Result</th></tr>
                </thead>
                <tbody>${stepsHtml}</tbody>
            </table>
        </section>
    `;
    document.getElementById('viewTcModal').classList.remove('hidden');
}

function closeViewModal() {
    document.getElementById('viewTcModal').classList.add('hidden');
}

function onCopyValueClick(e) {
    const btn = e.target.closest('.btn-copy-value');
    if (!btn) return;
    const wrap = btn.closest('.view-copy-wrap');
    const valSpan = wrap ? wrap.querySelector('.view-value') : btn.previousElementSibling;
    if (!valSpan) return;
    const text = valSpan.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const orig = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = orig; }, 1200);
    }).catch(() => alert('Could not copy to clipboard.'));
}

/** Load TCs from an array (from fetch or file). Replaces or merges into current list. */
function loadTcArray(arr) {
    const data = Array.isArray(arr) ? arr : [arr];
    const loaded = data.map(tc => {
        const n = normalizeTc(tc);
        n.selected = true;
        return n;
    });
    testCases = testCases.concat(loaded);
    renderTcList();
}

function csvEscape(val) {
    const s = String(val ?? '');
    if (/[",\r\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
    return s;
}

function buildCsvRows() {
    const header = CSV_COLUMNS.join(',');
    const rows = [header];
    const selected = testCases.filter(tc => tc.selected && tc.steps && tc.steps.length > 0);

    selected.forEach(tc => {
        tc.steps.forEach((step, i) => {
            const name = i === 0 ? tc.name : '';
            const status = i === 0 ? tc.status : '';
            const precondition = i === 0 ? tc.precondition : '';
            const objective = i === 0 ? tc.objective : '';
            const priority = i === 0 ? tc.priority : '';
            const labels = i === 0 ? tc.labels : '';
            const estimatedTime = i === 0 ? tc.estimatedTime : '';
            const automated = i === 0 ? tc.automated : '';
            const automationPossible = i === 0 ? tc.automationPossible : '';
            const createdInVersion = i === 0 ? tc.createdInVersion : '';
            const stepText = step.step ?? '';
            const testData = step.testData ?? '';
            const expectedResult = step.expectedResult ?? '';
            const row = [
                name, status, precondition, objective, priority, labels,
                estimatedTime, automated, automationPossible, createdInVersion,
                stepText, testData, expectedResult
            ].map(csvEscape).join(',');
            rows.push(row);
        });
    });

    return rows.join('\r\n');
}

function exportCsv() {
    const selected = testCases.filter(tc => tc.selected);
    if (selected.length === 0) {
        alert('Select at least one test case to export.');
        return;
    }
    const invalid = selected.filter(tc => !tc.steps || tc.steps.length === 0);
    if (invalid.length > 0) {
        alert('Every selected test case must have at least one step. Fix: ' + invalid.map(t => t.name).join(', '));
        return;
    }

    const csv = buildCsvRows();
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zephyr-test-cases-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

document.getElementById('btnLoadFile').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        try {
            let text = reader.result;
            if (typeof text === 'string' && text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
            const data = JSON.parse(text);
            loadTcArray(Array.isArray(data) ? data : [data]);
        } catch (err) {
            alert('Invalid JSON in file. Check generated-tcs.json format. ' + (err.message ? '\n' + err.message : ''));
        }
        e.target.value = '';
    };
    reader.readAsText(file, 'UTF-8');
});

document.getElementById('selectAll').addEventListener('change', (e) => {
    testCases.forEach(tc => { tc.selected = e.target.checked; });
    renderTcList();
});

document.getElementById('btnExportCsv').addEventListener('click', exportCsv);

document.getElementById('viewModalClose').addEventListener('click', closeViewModal);
document.getElementById('viewModalOk').addEventListener('click', closeViewModal);
document.getElementById('viewModalBody').addEventListener('click', onCopyValueClick);
document.getElementById('viewTcModal').addEventListener('click', (e) => {
    if (e.target.id === 'viewTcModal') closeViewModal();
});

// Load TCs from generated-tcs.json when page is served (e.g. Live Server, npx serve)
// When opened via file://, fetch is blocked by the browser — user must use "Load from file"
fetch('generated-tcs.json')
    .then(res => res.ok ? res.json() : Promise.reject())
    .then(data => {
        if (Array.isArray(data) && data.length > 0) {
            testCases = data.map(tc => ({ ...normalizeTc(tc), selected: true }));
        }
    })
    .catch(() => {})
    .finally(() => {
        renderTcList();
        // If opened via file:// and no TCs loaded, show clear hint to use "Load from file"
        if (window.location.protocol === 'file:' && testCases.length === 0 && emptyStateEl && !emptyStateEl.classList.contains('hidden')) {
            emptyStateEl.innerHTML = 'TCs did not load automatically because the page was opened from disk (file://). <strong>Click "Load from file (generated-tcs.json)"</strong> above and select the <code>generated-tcs.json</code> file from the <code>tc-export</code> folder to view the test cases.';
            emptyStateEl.classList.add('file-hint');
        }
    });
