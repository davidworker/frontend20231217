let dom = {};

class Todo {
    constructor() {
        this.initDom();
        this.initEvent();
    }

    /**
     * 抓取所需 dom [v]
     */
    initDom() {
        dom = {
            text: document.querySelector('#data-text'),
            btn: document.querySelector('#add-btn'),
            data: document.querySelector('#todo-data')
        }
    }

    /**
     * 綁定 dom 事件 [v]
     */
    initEvent() {
        dom.btn.addEventListener('click', this.insertItem);
        dom.data.addEventListener('click', this.toggleCheckbox);
    }

    /**
     * 新增項目事件串接 []
     * @param {*} e 
     */
    async insertItem(e) {
        console.log('run insertItem.');
        let value = dom.text.value;

        if (!value) {
            await Swal.fire({
                title: '新增失敗',
                html: '未輸入項目名稱',
                icon: 'error'
            });
        } else {
            // TODO: not found.
            this.insert(value, false, -1);
        }
        dom.text.value = '';

        setTimeout(() => {
            dom.text.focus();
        }, 400)
    }

    /**
     * 新增項目 []
     * @param {*} text 
     * @param {*} active 
     * @param {*} index 
     */
    insert(text, active, index) {
        console.log('run insert.')
        console.log(text, active, index);
        // this.generateItem(text, active, index);
        // this.data.push({
        //     name: text,
        //     active: active
        // })
        // this.write();
    }

    /**
     * 產生項目 html []
     * @param {*} text 
     * @param {*} active 
     * @param {*} index 
     */
    generateItem(text, active, index) {
        if (index < 0) {
            index = this.data.length;
        }
        let checkbox_active = '';
        let li = document.createElement('li');
        li.classList.add('todo-item');

        if (active) {
            li.classList.add('checked');
            checkbox_active = 'active';
        }


        li.innerHTML = `<span class="todo-checkbox ${checkbox_active}" data-index="${index}"></span>
                        <span>${text}</span>`;
        this.dom.data.appendChild(li);
    }
}

export { Todo }