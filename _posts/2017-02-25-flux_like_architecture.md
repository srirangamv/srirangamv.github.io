---
layout: post
title: "Flux-like architecture in plain Javascript"
name: "2017-02-25-flux_like_architecture"
description: "flux like architecture sample."
date: 2017-02-25
---

<p>Here is plain javascript code to explain flux architecture.</p>

<p>We define two views and a store, dispatcher and promise are the utilities. 
The first view uses four types of action which are registered with dispatcher and if any store registered to it against those actions can fulfil the action via a promise. Also this store emits an event to the dispatcher. Dispatcher in turn invoke the event handler any registered to it. The second view listens to this event here.
</p>

<p>
    <figure>
      <img src="/images/FluxDemo.png" alt="Flux like architecture communication diagram" width="800" height="200" />
      <figcaption>Flux Communication Diagram</figcaption>
    </figure>    
</p>

{% highlight html %}

<!DOCTYPE html>
<html>

<body>
    <script>
        function Promise() {
            var state = "made";
            return {
                done: function (df) {
                    done = df;
                },
                error: function (ef) {
                    error = ef;
                },
                reject: reject = function (d) {
                    if (state === "made" && error) {
                        state = "broken";
                        error(d);
                    }
                },
                resolve: function (d) {
                    if (state === "made" && done) {
                        state = "fulfilled";
                        done(d);
                    }
                }
            }
        }

        function Dispatcher() {
            var callbackstore = [];
            var stores = [];  
            var eventhandlers = [];
            
            this.registerview = function (actiontype, callbacks) {
                if (callbackstore[actiontype]) {
                    callbackstore[actiontype].concat(callbacks);
                } else {
                    callbackstore[actiontype] = callbacks;
                }
            };

            this.registerstore = function (actiontypes, store) {
                for(var actiontype in actiontypes){
                    stores[actiontypes[actiontype]] = store;
                }
            };
                        
            this.registerevent = function (actiontype, eventcallbacks){
                if (eventhandlers[actiontype]) {
                    eventhandlers[actiontype].concat(eventcallbacks);
                } else {
                    eventhandlers[actiontype] = eventcallbacks;
                }
            };

            this.dispatch = function (actionpayload) { //actionpayload={name, paramsarray}
                //find actiontype and call store.
                var callbacks = callbackstore[actionpayload.name];
                var promise = stores[actionpayload.name].reduce(actionpayload.name, actionpayload.params);
                promise.done(function (data) {
                    callbacks.forEach(function (item, index) {
                        item(data);
                    });
                });
                promise.error(function (msg) {
                    callbacks.forEach(function (item, index) {
                        item(undefined, msg);
                    });
                });
            };
            
            this.emit = function (actiontype, result){
                var handlers = eventhandlers[actiontype];
                if(handlers.length > 0){
                    for(var e in handlers){
                        handlers[e](result);
                    }
                }                    
            };
        }

        /*
        1. views can query store via action or listen to an event
        */
        function CalcView(dispatcher) {
            this.callbackfunc = function (result, err) {
                if(err)
                    console.log(err);
                else
                    console.log(result);
            };
            dispatcher.registerview("getadd", [this.callbackfunc]);
            dispatcher.registerview("getsub", [this.callbackfunc]);
            dispatcher.registerview("getmul", [this.callbackfunc]);
            dispatcher.registerview("getdiv", [this.callbackfunc]);

            dispatcher.dispatch({
                "name": "getadd",
                "params": [1, 2]
            });
            /*dispatcher.dispatch({
                "name": "getsub",
                "params": [1, 2]
            });
            dispatcher.dispatch({
                "name": "getmul",
                "params": [1, 2]
            });*/
            dispatcher.dispatch({
                "name": "getdiv",
                "params": [6, 2] 
            });
            dispatcher.dispatch({
                "name": "getdiv",
                "params": [1, 0]
            });
        }

        function CalcHistoryView(dispatcher) {
            this.eventcallbackfunc = function (result) {
                console.log(result);
            };
            dispatcher.registerevent("gethist", [this.eventcallbackfunc]);
        }

        /*
        1. return/emit readonly data
        2. only action can change the state of store
        */
        function CalcStore(dispatcher) {
            dispatcher.registerstore([
                "getadd",
                "getmul",
                "getsub",
                "getdiv"
            ], this);
            this.reduce = function (actiontype, params) {
                //based on actiontype return a promise
                switch (actiontype) {
                    case "getadd":
                        return add.apply(undefined, params);                    
                        break;
                    case "getdiv":
                        return divide.apply(undefined, params);                    
                        break;
                    case "getsub":
                        return add.apply(undefined, params);                    
                        break;
                    case "getmul":
                        return divide.apply(undefined, params);                    
                        break;
                }
            };
            var calchistory = [];
            var add = function(a,b){
                
                var getadd = new Promise();
                historyadd({"operation": "add", "params": [a, b]});
                setTimeout(getadd.resolve, 2000, a+b);
                return getadd;
            };
            var divide = function(a,b){
                historyadd({"operation": "divide", "params": [a, b]});
                var getdiv = new Promise();
                if(b==0)
                    setTimeout(getdiv.reject, 2000, "divide by zero");
                else
                    setTimeout(getdiv.resolve, 2000, a / b);
                return getdiv;
            }
            var historyadd = function(item){
                calchistory.push(item);
                //return a copy of history or formatted history
                dispatcher.emit("gethist", JSON.stringify(calchistory)); 
            }
        }

        var dispatcher = new Dispatcher();
        var calcStore = new CalcStore(dispatcher);
        var calcHistoryView = new CalcHistoryView(dispatcher);
        var calcView = new CalcView(dispatcher);
    </script>
</body>

</html>


{% endhighlight %}

<b>Output:</b>
<p class="output">
Here is the browser's console log for when app loaded at first.<br>
<br>[{"operation":"add","params":[1,2]}]<br>
[{"operation":"add","params":[1,2]},{"operation":"divide","params":[6,2]}]<br>
[{"operation":"add","params":[1,2]},{"operation":"divide","params":[6,2]},{"operation":"divide","params":[1,0]}]<br>
3<br>
3<br>
divide by zero<br>
</p>