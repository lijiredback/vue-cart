module.exports = {
    configureWebpack: {
        devServer: {
            before(app) {
                app.get('/api/goods', function (req, res) {
                    res.json({
                        code: 200,
                        goodsList: [
                            { id: 1, text: '项链', price: 1200 },
                            { id: 2, text: '戒指', price: 1500 }
                        ]
                    });
                });
            }
        }
    }
};