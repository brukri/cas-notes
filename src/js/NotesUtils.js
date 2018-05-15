class NotesUtils {


    static getSelectedRadioValue(radioName) {
        const radioPriorityElements = document.getElementsByName(radioName);

        for (const element of radioPriorityElements) {
            if (element.checked) {
                return element.value;
            }
            return null;
        }
    }
}

export default NotesUtils;