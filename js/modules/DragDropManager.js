export class DragDropManager {
    constructor(canvasElement, callbacks) {
        this.canvas = canvasElement;
        this.onUpdate = callbacks.onUpdate;
        this.onAdd = callbacks.onAdd;
        this.sortables = [];
    }

    init() {
        if (!window.Sortable) {
            console.warn('SortableJS not found. Drag and drop disabled.');
            return;
        }

        // Initialize Canvas (Target)
        this.sortables.push(new Sortable(this.canvas, {
            group: 'badges',
            animation: 150,
            ghostClass: 'sortable-ghost',
            onEnd: (evt) => {
                // Only trigger update if moved within the same list
                if (evt.to === evt.from && this.onUpdate) {
                    this.onUpdate(evt.oldIndex, evt.newIndex);
                }
            },
            onAdd: (evt) => {
                // When item is dropped from sidebar
                const item = evt.item;
                if (item.dataset.template && this.onAdd) {
                    try {
                        const template = JSON.parse(item.dataset.template);
                        // Remove the DOM element created by Sortable, 
                        // as we want to render it properly via our app state
                        item.remove();
                        this.onAdd(template, evt.newIndex);
                    } catch (e) {
                        console.error('Failed to parse template data', e);
                    }
                }
            }
        }));

        // Initialize Sidebar Categories (Sources)
        document.querySelectorAll('.category-items').forEach(el => {
            this.sortables.push(new Sortable(el, {
                group: {
                    name: 'badges',
                    pull: 'clone',
                    put: false
                },
                sort: false,
                animation: 150
            }));
        });
    }

    destroy() {
        this.sortables.forEach(s => s.destroy());
        this.sortables = [];
    }
}
