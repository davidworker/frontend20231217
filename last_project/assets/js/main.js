let options = {
    data() {
        return {
            menu_items: {},
            current_menu: 'dashboard',
            diff_item: {
                sale: {
                    month: 0,
                    today: 0,
                    week: 0
                },
                order: {
                    month: 0,
                    today: 0,
                    week: 0
                },
                member: {
                    month: 0,
                    today: 0,
                    week: 0
                },
                visit: {
                    month: 0,
                    today: 0,
                    week: 0
                }
            },
            progress_item: {
                question: 0,
                sms: 0,
                item: 0,
                member: 0
            }
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
        },
        async fetchDiffItem() {
            let response = await fetch('assets/database/diff.json');
            let data = await response.json();
            this.diff_item = data;
        },
        async fetchProgressItem() {
            let response = await fetch('assets/database/progress.json');
            let data = await response.json();
            this.progress_item = data;
        }
    },
    mounted() {
        console.log('admin app is mount.');
        this.initMenuItems();
        this.initCurrentMenu();
        this.fetchDiffItem();
        this.fetchProgressItem();
    }
}


Vue.createApp(options).mount('#admin-app');