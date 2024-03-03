// 抓取必要的 DOM
let dom = {
    text: document.querySelector('#data-text'),
    btn: document.querySelector('#add-btn'),
    data: document.querySelector('#todo-data')
};

/**
 * 1. 按鈕事件綁定
 * 2. 當按下按鈕時，抓取輸入框文字
 *  2-1. 檢查輸入框是否有值
 *      2-1-1. 沒有值的時候
 *          2-1-1-a. 顯示提醒文字
 *          2-1-1-b. 將焦點放到輸入框
 *  2-2. 清除輸入框的值
 *  2-3. 將焦點放到輸入框
 * 3. 將值新增到列表區塊
 */

/**
 * 將值新增到列表區塊
 * @param {string} text 項目名稱
 * @returns {void}
 */
const insertTodo = (text) => {
    // 因為 appendChild 只接受 Node 物件，所以需要建立 Node 物件後再附加資料
    let li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = `<span class="todo-checkbox"></span>
                    <span>${text}</span>`;
    dom.data.appendChild(li);
}

// 
/**
 * 1. 按鈕事件綁定
 * @param {object} e 事件物件，事件觸發時自動傳進
 * @returns {void}
 */
const onBtnClick = async (e) => {
    // 2. 當按下按鈕時，抓取輸入框文字
    let value = dom.text.value;

    // 2-1. 檢查輸入框是否有值
    // 2-1-1. 沒有值的時候，顯示提醒文字，將焦點放到輸入框
    if (!value) {
        // 2-1-1-a. 顯示提醒文字
        await Swal.fire({
            title: '新增失敗',
            html: '未輸入項目名稱',
            icon: 'error'
        })

        // 2-1-1-b. 將焦點放到輸入框
        // 省略動作，最後統一處理
    } else {
        // 3. 將值新增到列表區塊
        insertTodo(value);
    }

    // 2-2. 清除輸入框的值
    dom.text.value = '';

    // 2-3. 將焦點放到輸入框
    // FIXME: 修正 sweetalert 套件消失過場動畫導致焦點遺失問題
    setTimeout(() => {
        dom.text.focus();
    }, 400)

}
dom.btn.addEventListener('click', onBtnClick);

