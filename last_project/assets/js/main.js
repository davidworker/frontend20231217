let chart = {
    online: '',
}


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
            },
            hot_item: [],
            hot_article: [],
            current_online: 0
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
        },
        async fetchHotItem() {
            let response = await fetch('assets/database/hot_item.json');
            let data = await response.json();
            this.hot_item = data;
        },
        async fetchHotArticle() {
            let response = await fetch('assets/database/hot_article.json');
            let data = await response.json();
            this.hot_article = data;
        },
        initChart() {
            let ctx = this.$refs.current_online;
            let data = {
                lables: ['online', 'full'],
                datasets: [{
                    label: 'cureent online',
                    data: [0, 100],
                    backgroundColor: ['#345ad6', '#dedede'],
                    hoverOffset: 1
                }]
            }
            chart.online = new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: {
                    rotation: -90,
                    circumference: 180,
                    plugins: {
                        tooltip: {
                            enabled: false
                        },
                    }
                }
            });

            setInterval(() => {
                let online = Math.round(Math.random() * 100);
                let full = 100 - online;
                chart.online.data.datasets[0].data[0] = online;
                chart.online.data.datasets[0].data[1] = full;
                chart.online.update();
                this.current_online = online;
            }, 3000)
        }
    },
    mounted() {
        console.log('admin app is mount.');
        this.initMenuItems();
        this.initCurrentMenu();
        this.fetchDiffItem();
        this.fetchProgressItem();
        this.fetchHotItem();
        this.fetchHotArticle();
        this.initChart();
        // let item = [];
        // for (let i = 0; i < 10; i++) {
        //     item.push({
        //         title: '標題' + Math.round(Math.random() * 1000),
        //         visit: Math.round(Math.random() * 100000),
        //     })
        // }
        // console.log(JSON.stringify(item))
    }
}


Vue.createApp(options).mount('#admin-app');