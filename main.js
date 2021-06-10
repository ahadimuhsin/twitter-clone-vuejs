Vue.component('tweet-message', {
    props: {
        'tweet': Object
    },

    template: `<div class="tweetMsg">
    <p>
        {{ tweet.text }}
    </p>

    <div class="tweetDate">
        <i class="fas fa-calendar-alt fa-sm fa-fw">
            </i> {{ tweet.date }}
    </div>
    <div class="tweet_remove" @click="$emit('remove-tweet', 'index')">
        <span class="remove">
                Delete this tweet
                <i class="fas fa-trash fa-xs fa-fw"></i>
        </span>
    </div>
</div>`
});

let app = new Vue({
    el: "#app",
    data: {
        userData: {},
        usersID: 0,
        name: "",
        email: "",
        password: "",
        max_length: 25,
        max_pass_length: 16,
        error: "",
        registered: false,
        max_tweet: 240,
        tweetMsg: "",
        tweets: []
    },
    methods: {
        registerAccount() {
            if (this.name != "" && this.email != "" && this.password != "") {
                this.userData.id = ++this.usersID;
                this.userData.name = this.name;
                this.userData.email = this.email;
                this.userData.password = this.password;
                this.registered = true;
            } else {
                this.error = "Complete all the form fields";
            }


            //save to localStorage
            localStorage.setItem('simple_tweet_registered', true);
            localStorage.setItem('simple_tweet_registered_user', JSON.stringify(this.userData));

            //clear the form
            this.name = "";
            this.email = "";
            this.password = "";

            // this.registered = true;
        },
        sendTweet() {
            // Simpan tweetMsg ke dalam tweets
            this.tweets.unshift({
                    text: this.tweetMsg,
                    date: new Date().toLocaleTimeString(),
                    id_user: this.userData.id
                })
                //kosongkan tweetMsg
            this.tweetMsg = "";

            // Ubah objek menjadi string
            let stringTweets = JSON.stringify(this.tweets);

            //simpan tweets ke dalam localStorage
            localStorage.setItem('simple_tweet_tweets', stringTweets);
        },

        removeTweet(index) {
            let removeTweet = confirm("Are you sure you want to remove this tweet?");
            if (removeTweet) {
                this.tweets.splice(index, 1);
                localStorage.simple_tweet_tweets = JSON.stringify(this.tweets);
            }
        }

    },

    created() {
        /* Check if the user is registered and set the registered to true */
        if (localStorage.getItem("simple_tweet_registered") === "true") {
            this.registered = true
        }

        //repopulate the userData object
        if (localStorage.getItem('simple_tweet_registered_user')) {
            this.userData = JSON.parse(localStorage.getItem('simple_tweet_registered_user'));
        }

        // Parse all tweets from localstorage
        if (localStorage.getItem("simple_tweet_tweets")) {
            console.log("There is a list of tweets");
            this.tweets = JSON.parse(localStorage.getItem("simple_tweet_tweets"));
        } else {
            console.log("No tweets here");
        }
    },
});