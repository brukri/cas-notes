class NotesUtils {


    static getSelectedRadioValue(radioName) {
        const radioUrgencyElements = document.getElementsByName(radioName);

        for (const element of radioUrgencyElements) {
            if (element.checked) {
                return element.value;
            }
            return null;
        }
    }
}

export default NotesUtils;