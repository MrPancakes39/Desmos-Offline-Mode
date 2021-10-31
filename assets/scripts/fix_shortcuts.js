function fixShortcuts() {
    $(document).keydown((e) => {
        e.superKey = e["originalEvent"].getModifierState("OS");

        const noMod = !e.ctrlKey && !e.shiftKey && !e.altKey && !e.superKey;
        const Ctrl = e.ctrlKey && !e.shiftKey && !e.altKey && !e.superKey;
        const Shift = !e.ctrlKey && e.shiftKey && !e.altKey && !e.superKey;
        const Alt = !e.ctrlKey && !e.shiftKey && e.altKey && !e.superKey;
        const Super = !e.ctrlKey && !e.shiftKey && !e.altKey && e.superKey;
        const CtrlShift = e.ctrlKey && e.shiftKey && !e.altKey && !e.superKey;
        const CtrlAlt = e.ctrlKey && !e.shiftKey && e.altKey && !e.superKey;
        const ShiftAlt = !e.ctrlKey && e.shiftKey && e.altKey && !e.superKey;
        const CtrlAltShift = e.ctrlKey && e.shiftKey && e.altKey && !e.superKey;

        // Close a dialog
        if (noMod && e.code === "Escape") {
            const dcg_elt = $("#dcg-modal-container .dcg-icon-remove");
            if (dcg_elt.length) {
                dcg_elt.trigger("dcg-tap");
            }
            const alert_elt = $(".dcg-alert-container");
            if (alert_elt.length) {
                alert_elt.remove();
            }
            return;
        }
        // New Graph
        if (Ctrl && e.code === "KeyN") {
            e.preventDefault();
            $(".align-left-container .dcg-icon.dcg-icon-plus").click()
            return;
        }
        // Open a Graph
        if (Ctrl && e.code === "KeyO") {
            e.preventDefault();
            $(".dcg-action-open").click();
            return;
        }
        // Save a Graph
        if (Ctrl && e.code === "KeyS") {
            e.preventDefault();
            $(".save-btn-container").click();
            return;
        }
        // Show or Hide the Expression List
        if (ShiftAlt && e.code === "KeyE") {
            e.preventDefault();
            const t = Calc._calc.controller;
            const expVisible = t.layoutModel.expressionsVisible;
            if (expVisible) {
                t.dispatch({ type: "hide-expressions-list", focusShowIcon: !1 });
            } else {
                t.dispatch({ type: "show-expressions-list", focusShowIcon: !1 })
            }
            return;
        }
        // Focus the Expression List
        if (CtrlAlt && e.code === "KeyE") {
            Calc.focusFirstExpression();
            return;
        }
        // Toggle Options for the Focused Expression
        if (CtrlShift && e.code === "KeyO") {
            let t = Calc._calc.controller;
            let item = t.getSelectedItem();
            if (item && (item.type === "expression" || item.type === "image"))
                Calc._toggleOptions(item);
            return;
        }
        // Delete the Focused Expression
        if (CtrlShift && e.code === "KeyD") {
            Calc.removeSelected();
            return;
        }
        // Add an Expression
        if (CtrlAlt && e.code === "KeyX") {
            Calc._add("expression");
            return;
        }
        // Add a Note
        if (CtrlAlt && e.code === "KeyO") {
            Calc._add("note");
            return;
        }
        // Collapse / Expand Selected Folder
        if (Alt && e.code === "ArrowUp") {
            let t = Calc._calc.controller;
            let item = t.getSelectedItem();
            if (item && item.type === "folder") {
                item.model = t.getItemModel(item.id);
                t.dispatch({ type: "set-folder-collapsed", id: item.id, isCollapsed: !item.model.collapsed });
            }
        }
        // Add a Folder
        if (CtrlAlt && e.code === "KeyF") {
            Calc._add("folder");
            return;
        }
        // Add a Note
        if (CtrlAlt && e.code === "KeyI") {
            Calc._add("image");
            return;
        }
        // Add a Table
        if (CtrlAlt && e.code === "KeyT") {
            Calc._add("table");
            return;
        }
        // Undo
        if (Ctrl && e.code === "KeyZ") {
            const t = Calc._calc.controller;
            const toastData = t.getToastData();
            if (!_.isEmpty(toastData) && typeof toastData.undoCallback === "function") {
                toastData.undoCallback();
            } else {
                Calc.undo();
            }
            return;
        }
        // Redo
        if ((CtrlShift && e.code === "KeyZ") || (Ctrl && e.code === "KeyY")) {
            Calc.redo();
            return;
        }
        // Turn Edit List Mode On or Off
        if (CtrlAlt && e.code === "KeyD") {
            let t = Calc._calc.controller;
            let mode = !t.isInEditListMode();
            t.dispatch({ type: "set-edit-list-mode", isEditListMode: mode, focusExpressionList: !0 });
            return;
        }
        // Open or Close the Graph Settings Menu
        if (CtrlAlt && e.code === "KeyG") {
            Calc._calc.controller.dispatch({ type: "toggle-graph-settings", focusOnOpen: !0 });
            return;
        }
        // Open or Close the Help Menu
        if (CtrlAlt && e.code === "KeyH") {
            $(".dcg-help-btn").trigger("dcg-tap");
            return;
        }
    });
}