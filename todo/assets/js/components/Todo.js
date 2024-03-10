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
        // TODO: 會有 this 問題
        // dom.btn.addEventListener('click', this.insertItem);

        dom.btn.addEventListener('click', async () => {
            let value = dom.text.value;
            let isValid = await this.insertValid(value);
            console.log(isValid);

            if (isValid) {
                this.insert(value, false, -1);
            }

            dom.text.value = '';
        });


        dom.data.addEventListener('click', this.toggleCheckbox);
    }

    /**
     * 新增資料驗證
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