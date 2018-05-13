function saveNote() {
    const title = document.getElementById('input-title').value;
    const description = document.getElementById('input-description').value;
    const dueDate = document.getElementById('input-due-date').value;
    const urgency = getSelectedUrgencyValue();
    const notes = localStorage.getItem('notes') ? JSON.parse(localStorage.getItem('notes')) : [];
    notes.push({
        title: title,
        description: description,
        urgency: urgency,
        dueDate: dueDate
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function getSelectedUrgencyValue() {
    const radioUrgencyElements = document.getElementsByName('radio-urgency');

    for (const element of radioUrgencyElements) {
        if (element.checked) {
            return element.value;
        }
        return undefined;
    }
}
