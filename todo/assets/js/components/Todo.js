let dom = {};
let items = [];

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
            container: document.querySelector('#todo-data')
        }
    }

    /**
     * 綁定 dom 事件 []
     */
    initEvent() {
        this.initInsertEvent();


        dom.container.addEventListener('click', this.toggleCheckbox);
    }

    /**
     * 新增項目事件綁定 [v]
     */
    initInsertEvent() {
        // TODO: 會有 this 問題
        // dom.btn.addEventListener('click', this.insertItem);

        dom.btn.addEventListener('click', async () => {
            let value = dom.text.value;
            let isValid = await this.insertValid(value);

            if (isValid) {
                this.insert(value, false, -1);
            }

            dom.text.value = '';
        });
    }

    /**
     * 新增資料驗證 [v]
     */
    async insertValid(value) {
        if (!value) {
            await Swal.fire({
                title: '新增失敗',
                html: '未輸入項目名稱',
                icon: 'error'
            });
            setTimeout(() => {
                dom.text.focus();
            }, 400)
            return false;
        }
        return true;
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
        this.generateItem(text, active, index);
        // items.push({
        //     name: text,
        //     active: active
        // })
        // this.write();
    }

    /**
     * 產生項目 html 附加到顯示區塊 [v]
     * @param {*} text 
     * @param {*} active 
     * @param {*} index 
     */
    generateItem(text, active, index) {
        if (index < 0) {
            index = items.length;
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
        dom.container.appendChild(li);
    }
}

export { Todo }