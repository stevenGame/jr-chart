<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <div id="tv_chart_container"></div>
        <!--<p>-->
        <!--For guide and recipes on how to configure / customize this project,<br>-->
        <!--check out the-->
        <!--<a href="https://github.com/vuejs/vue-cli/tree/dev/docs" target="_blank">vue-cli documentation</a>.-->
        <!--</p>-->
        <!--<h3>Installed CLI Plugins</h3>-->
        <!--<ul>-->
        <!--<li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank">babel</a></li>-->
        <!--<li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank">eslint</a></li>-->
        <!--</ul>-->
        <!--<h3>Essential Links</h3>-->
        <!--<ul>-->
        <!--<li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>-->
        <!--<li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>-->
        <!--<li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>-->
        <!--<li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>-->
        <!--</ul>-->
        <!--<h3>Ecosystem</h3>-->
        <!--<ul>-->
        <!--<li><a href="https://router.vuejs.org/en/essentials/getting-started.html" target="_blank">vue-router</a></li>-->
        <!--<li><a href="https://vuex.vuejs.org/en/intro.html" target="_blank">vuex</a></li>-->
        <!--<li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank">vue-devtools</a></li>-->
        <!--<li><a href="https://vue-loader.vuejs.org/en" target="_blank">vue-loader</a></li>-->
        <!--<li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>-->
        <!--</ul>-->
    </div>
</template>

<script>
    /* eslint-disable */
    export default {
        name: 'HelloWorld',
        props: {
            msg: String
        },
        mounted() {
            function getParameterByName(name) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                    results = regex.exec(location.search);
                return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
            }

            TradingView.onready(function () {
                window.tvWidget = new TradingView.widget({
                    // debug: true, // uncomment this line to see Library errors and warnings in the console
                    fullscreen: true,
                    symbol: 'MSFT',
                    interval: 'D',
                    container_id: "tv_chart_container",
                    //	BEWARE: no trailing slash is expected in feed URL
                    datafeed: new Datafeeds.UDFCompatibleDatafeed("http://localhost:3000"), // local data feeds services
                    // datafeed: new Datafeeds.UDFCompatibleDatafeed("/data"), // local data
                    // datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),
                    library_path: "charting_library/",
                    locale: getParameterByName('lang') || "zh",
                    //	Regression Trend-related functionality is not implemented yet, so it's hidden for a while
                    drawings_access: {type: 'black', tools: [{name: "Regression Trend"}]},
                    disabled_features: ["use_localstorage_for_settings"],
                    enabled_features: ["study_templates"],
                    charts_storage_url: 'http://saveload.tradingview.com',
                    charts_storage_api_version: "1.1",
                    client_id: 'tradingview.com',
                    user_id: 'public_user_id',
                    widgetbar: {
                        details: true,
                        watchlist: true,
                        watchlist_settings: {
                            default_symbols: ["NASDAQ:AAPL", "NASDAQ:MSFT"],
                            readonly: false
                        }
                    },

                    // charts widget theme overrides but i think if we switch to the trading-terminal
                    // we will have default setting for dark them
                    overrides: {
                        "paneProperties.background": "#000"
                    }
                });
            });
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
