let options = {
    data() {
        return {
            menu_items: {},
            current_menu: 'dashboard',
        }
    },
    methods: {
        setCurrentMenu(id) {
            this.current_menu = id;
        },
        initCurrentMenu() {
            let hash = location.hash;
            if (!hash) {
                hash = 'dashboard';
            } else {
                hash = hash.substring(1);
            }

            this.current_menu = hash;
        },
        initMenuItems() {
            this.menu_items['dashboard'] = {
                icon: ['material-symbols-outlined', 'bar_chart'],
                name: '數據分析中心'
            };
            this.menu_items['frontend_setting'] = {
                icon: ['material-symbols-outlined', 'settings'],
                name: '前台頁面設定'
            };
        }
    },
    mounted() {
        console.log('admin app is mount.');
        this.initMenuItems();
        this.initCurrentMenu();
    }
}


Vue.createApp(options).mount('#admin-app');