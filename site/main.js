Vue.component('errors', {
	props:['content'],			
});

Vue.component('success', {
	props:['content']
});

Vue.component('users', {
	props:['name', 'email', 'id', 'surname'],
	methods: {
		userDelete(id) {
			requestAsync(
				'users/'+id, 
				'DELETE',
				null,


				(err, data) => {

					console.log(err, data);

					if (err !== null) {
					} else {

						if (typeof data.errors === 'undefined') {
							app.getUsers();
						} else {
						}
					}
				});	
		},
	}
});

Vue.component('product', {
	data: function(){
		return {
			product_upd_send: {
				name:'',
				description:'',
				price:'',
				image:'',
			},
			product_upd:false,
			errors_product_update:'',
		}
	},
	props:['content', 'id', 'name', 'description', 'price', 'image',],
	methods:{
		productUpdate(product) {
			this.product_upd=true;
			this.product_upd_send.name=product.name;
			this.product_upd_send.description=product.description;
			this.product_upd_send.price=product.price;
			this.product_upd_send.image=product.image;
		},

		productUpdateReal: function(id) {
			this.errors_product_update='';
			requestAsync(
				'products/'+ id, 
				'PUT',
				this.product_upd_send,


				(err, data) => {

					console.log(err, data);

					if (err !== null) {
						this.errors_product_update = err;
					} else {

						if (typeof data.errors === 'undefined') {
							app.productGet();
							app.cacheClear();
							this.product_upd=false;
						} else {
							this.errors_product_update = data.errors;
						}
					}
				});
		},
		productDelete(id) {
			app.productDelete(id);
		},
		apiCheck() {
			if(app.api_token==app.admin_token){
				return true;
			}
			else {
				return false;
			}
		},
		controlCheck() {
			if(this.product_upd){
				return true;
			}
			else {
				return false;
			}
		}
	}
})

Vue.component('comment', {
	data: function() {
		return  {
			comment_upd_send: {
				content:'',
			},
			comment_upd:false,
			errors:'',
		}
	},
	props:['id', 'name', 'surname', 'content', 'date',  'api_token',],
	methods: {
		apiCheck(api_token){
			if(api_token==app.api_token){
				return true;
			}
			else {
				return false;
			}
		},

		commentUpdate(comment) {
			this.comment_upd=true;
			this.comment_upd_send.content=comment;
		},

		commentUpdateReal(id){
			this.errors='';
			requestAsync(
				'comments/'+ id, 
				'PUT',
				this.comment_upd_send,


				(err, data) => {

					console.log(err, data);

					if (err !== null) {
						this.errors = err;
					} else {

						if (typeof data.errors === 'undefined') {
							app.getComments();
							this.comment_upd=false;
						} else {
							this.errors = data.errors;
						}
					}
				});
		},

		commentDelete(id) {
			requestAsync(
				'comments/'+id, 
				'DELETE',
				null,


				(err, data) => {

					console.log(err, data);

					if (err !== null) {
						
					} else {

						if (typeof data.errors === 'undefined') {
							app.getComments();
						} 
						else {
						}
					}
				});
		}
	}
});

const app = new Vue({
	el: '#app',
	data: {
		page: "home",
		api_token: 'null',
		admin_token:'3yFs5jepdRVddKGWmjV8la3HZk4wm77WffjEIv9XLQOFKfp9ngIG6bpA0TFbXiAQRR5EGXqYnfbjd99a',
		errors_product:'',
		product: {
			name:'',
			description:'',
			price:'',
			image:'',
			id:'',
		},
		comments:[],
		comment: {
			content:'',
		},			 
		products:[],
		errors_auth:'',
		success_auth:false,
		authorisation: {
			email:'',
			password:'',
		},
		controls:{
			next_page:'',
			prev_page:'',
			page:1,
		},
		users:[],
		errors_regist:'',
		success_regist:false,
		registration: {
			name:'',
			surname:'',
			email:'',
			password:'',
		}
	},
	mounted() {
		if (localStorage.api_token) {
			this.api_token = localStorage.api_token;
		}
	},
	watch: {
		api_token(newApi_token) {
			localStorage.api_token = newApi_token;
		}
	},
	methods: {
		getRegist: function() {
			this.page='regist';
			this.cacheClear();
		},

		getAuth: function() {
			this.page='auth';
			this.cacheClear();
		},

		getHome: function() {
			this.page='home';
			this.cacheClear();
		},

		getComments: function() {
			this.page='comments';
			this.cacheClear();
			this.commentGet();
		},

		getUsers: function() {
			this.page='users';
			this.cacheClear();
			this.userGet();
		},

		getProducts: function() {
			this.page='products';
			this.cacheClear();
			this.productGet();
		},

		forgetApi_token: function() {
			this.api_token='null';
			this.cacheClear();
		},

		pageDefine(path) {
			if(this.controls.page!=1){
				return this.controls.page;
			}
			else{
				return ('http://127.0.0.1:8000/api/' + path);
			}
		},
		pageDrop(){
			this.controls.page=1;
			this.controls.next_page='';
			this.controls.prev_page='';
		},
		nextPage() {
			this.controls.page=this.controls.next_page;
		},

		prevPage() {
			this.controls.page=this.controls.prev_page;
		},


		/*-------------------------------------*/
		/*-------------------------------------*/

		userGet() {
			requestAsyncPag(
				this.pageDefine('users'), 
				'GET',
				null,


				(err, data) => {

					console.log(err, data);

					if (err !== null) {
					} else {

						if (typeof data.errors === 'undefined') {
							this.users=data.users.data;
							this.controls.next_page=data.users.next_page_url;
							this.controls.prev_page=data.users.prev_page_url;
						} else {
						}
					}
				});	
		},

		commentGet() {
			requestAsyncPag(
				this.pageDefine('comments'), 
				'GET',
				null,


				(err, data) => {

					console.log(err, data);

					if (err !== null) {
					} else {

						if (typeof data.errors === 'undefined') {
							this.comments=data.comments.data;
							this.controls.next_page=data.comments.next_page_url;
							this.controls.prev_page=data.comments.prev_page_url;
						} else {
						}
					}
				});	
		},

		// commentGet: function() {
		// 	requestAsync(
		// 		'comments', 
		// 		'GET', 
		// 		null, 
		// 		(err, data) => {

		// 			console.log(err, data);

		// 			if (err !== null) {
		// 				this.error = err
		// 			} else {

		// 				if (typeof data.error === 'undefined') {
		// 					this.comments = data
		// 				} else {

		// 				}
		// 			}
		// 		})
		// },

		commentSend: function() {
			this.comment.api_token=this.api_token;
			requestAsync(
				'comments', 
				'POST', 
				this.comment, 
				(err, data) => {

					console.log(err, data);

					if (err !== null) {
						this.error = err
					} else {

						if (typeof data.error === 'undefined') {
							this.getComments();
						} else {

						}
					}
				})
		},

		productGet() {
			requestAsyncPag(
				this.pageDefine('products'), 
				'GET',
				null,


				(err, data) => {

					console.log(err, data);

					if (err !== null) {
					} else {

						if (typeof data.errors === 'undefined') {
							this.products=data.products.data;
							this.controls.next_page=data.products.next_page_url;
							this.controls.prev_page=data.products.prev_page_url;
						} else {
						}
					}
				});	
		},

		productGetByPriceUp() {
			requestAsyncPag(
				this.pageDefine('priceup'), 
				'GET',
				null,


				(err, data) => {

					console.log(err, data);

					if (err !== null) {
					} else {

						if (typeof data.errors === 'undefined') {
							this.products=data.products.data;
							this.controls.next_page=data.products.next_page_url;
							this.controls.prev_page=data.products.prev_page_url;
						} else {
						}
					}
				});
		},

		productGetByPriceDown() {
			requestAsyncPag(
				this.pageDefine('pricedown'), 
				'GET',
				null,


				(err, data) => {

					console.log(err, data);

					if (err !== null) {
					} else {

						if (typeof data.errors === 'undefined') {
							this.products=data.products.data;
							this.controls.next_page=data.products.next_page_url;
							this.controls.prev_page=data.products.prev_page_url;
						} else {
						}
					}
				});
		},

		productFind(id) {
			requestAsync(
				'products/'+id, 
				'GET',
				null,


				(err, data) => {

					console.log(err, data);

					if (err !== null) {
					} else {

						if (typeof data.errors === 'undefined') {
								this.products=data;
								this.controls.next_page=null;
								this.controls.prev_page=null;
						} else {
						}
					}
				});
		},

		productSend: function() {
			this.errors_product='';
			this.success_product=false;
			requestAsync(
				'products', 
				'POST',
				this.product,


				(err, data) => {

					console.log(err, data);

					if (err !== null) {
						this.errors_product = err;
					} else {

						if (typeof data.errors === 'undefined') {
							this.success_product=true;
							this.productGet();
						} else {
							this.errors_product = data.errors;
						}
					}
				});
		},

		productDelete: function(id) {
			requestAsync(
				'products/'+id, 
				'DELETE',
				null,


				(err, data) => {

					console.log(err, data);

					if (err !== null) {
						
					} else {

						if (typeof data.errors === 'undefined') {
							this.productGet();
						} 
						else {
						}
					}
				});
		},

		authorisationSend: function() {
			this.errors_auth='';
			requestAsync(
				'authorisation', 
				'POST',
				this.authorisation,


				(err, data) => {

					console.log(err, data);

					if (err !== null) {
						this.errors_auth = err;
					} else {

						if (typeof data.errors === 'undefined') {
							this.success_auth=true;
							this.api_token=data.api_token;
							this.page='home';

						} else {
							this.errors_auth = data.errors;
						}
					}
				});	
		},

		registrationSend: function() {
			this.errors_regist='';
			requestAsync(
				'registration', 
				'POST',
				this.registration,


				(err, data) => {

					console.log(err, data);

					if (err !== null) {
						this.errors_regist = err;
					} else {

						if (typeof data.errors === 'undefined') {
							this.success_regist=true;
							this.api_token=data.api_token;
							this.page='home';

						} else {
							this.errors_regist = data.errors;
						}
					}
				});			
		},


		/*----------------------*/

		controlRules(but){
			if(but=='prev'){
				if(this.controls.prev_page==null){
					return{
						disabled:true,
					}
				}
			}
			if(but=='next'){
				if(this.controls.next_page==null){
					return{
						disabled:true,
					}
				}
			}
		},

		cacheClear: function() {
			this.comment.content='';

			this.errors_product='';
			this.success_product=false;
			this.product_upd=false;

			this.errors_auth='';
			this.success_auth=false;
			this.authorisation.email='';
			this.authorisation.password='';

			this.errors_regist='';
			this.success_regist=false;
			this.registration.name='';
			this.registration.surname='';
			this.registration.email='';
			this.registration.password='';
		},
	}
});

function requestAsync(path, method, data, cb) {
	$.ajax({
		url: 'http://127.0.0.1:8000/api/' + path,
		type: method,
		data: data,
		error: err => {
			cb(err, null)
		},
		success: data => {
			cb(null, data)				
		}
	})
}

function requestAsyncPag(path, method, data, cb) {
	$.ajax({
		url: path,
		type: method,
		data: data,
		error: err => {
			cb(err, null)
		},
		success: data => {
			cb(null, data)				
		}
	})
}