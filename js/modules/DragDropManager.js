export class DragDropManager {
    constructor(canvasElement, onUpdate) {
        this.canvas = canvasElement;
        this.onUpdate = onUpdate;
        this.sortable = null;
    }

    init() {
        if (window.Sortable) {
            this.sortable = new Sortable(this.canvas, {
                animation: 150,
                ghostClass: 'sortable-ghost',
                onEnd: (evt) => {
                    if (this.onUpdate) this.onUpdate(evt.oldIndex, evt.newIndex);
                }
            });
        } else {
            console.warn('SortableJS not found. Drag and drop disabled.');
        }
    }

    destroy() {
        if (this.sortable) {
            this.sortable.destroy();
        }
    }
}
