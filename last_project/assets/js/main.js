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
        initOnlineChart() {
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
        },
        initCustomChart() {
            let type = this.$refs.custom_type;
            let type_data = {
                lables: ['一般會員', '業務專員', '專業達人'],
                datasets: [{
                    label: '會員身分',
                    data: [100, 200, 300],
                    backgroundColor: ['#780e86', '#1e2088', '#e93369'],
                    hoverOffset: 1
                }]
            }
            new Chart(type, {
                type: 'doughnut',
                data: type_data,
            });

            let gender = this.$refs.custom_gender;
            let gender_data = {
                lables: ['男性', '女性'],
                datasets: [{
                    label: '會員性別',
                    data: [100, 200],
                    backgroundColor: ['#780e86', '#1e2088'],
                    hoverOffset: 1
                }]
            }
            new Chart(gender, {
                type: 'doughnut',
                data: gender_data,
            });

            let age = this.$refs.custom_age;
            let age_data = {
                lables: ['25~35歲', '36~45歲', '46~55歲', '56~65歲'],
                datasets: [{
                    label: '會員年齡',
                    data: [100, 200, 300, 400],
                    backgroundColor: ['#780e86', '#1e2088', '#e93369', '#ffe449'],
                    hoverOffset: 1
                }]
            }
            new Chart(age, {
                type: 'doughnut',
                data: age_data,
            });

            let role = this.$refs.custom_role;
            let role_data = {
                lables: ['標準會員', '基本會員', '高級會員'],
                datasets: [{
                    label: '會員分級',
                    data: [100, 200, 300],
                    backgroundColor: ['#780e86', '#1e2088', '#e93369'],
                    hoverOffset: 1
                }]
            }
            new Chart(role, {
                type: 'doughnut',
                data: role_data,
            });
        },
        initHistoryChart() {
            let ctx = this.$refs.history_chart;

            let tension = 0.3;
            let labels = [];
            let d1 = [];
            let d2 = [];
            let d3 = [];
            let d4 = [];
            for (let i = 1; i <= 12; i++) {
                labels.push(`${i}月`);
                d1.push(Math.round(Math.random() * 10000));
                d2.push(Math.round(Math.random() * 10000));
                d3.push(Math.round(Math.random() * 10000));
                d4.push(Math.round(Math.random() * 10000));
            }

            let data = {
                labels: labels,
                datasets: [
                    {
                        label: '營業額',
                        data: d1,
                        borderColor: '#780e86',
                        tension: tension
                    },
                    {
                        label: '去年營業額',
                        data: d2,
                        borderColor: '#1e2088',
                        tension: tension
                    },
                    {
                        label: '訪客數',
                        data: d3,
                        borderColor: '#e93369',
                        tension: tension
                    },
                    {
                        label: '會員數',
                        data: d4,
                        borderColor: '#ffe449',
                        tension: tension
                    }
                ]
            }

            new Chart(ctx, {
                type: 'line',
                data: data
            })
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
        this.initOnlineChart();
        this.initCustomChart();
        this.initHistoryChart();
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