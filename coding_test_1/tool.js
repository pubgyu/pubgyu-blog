const imgCollection = [
	{
		"imgId" : "00001",
		"imgUrl" : "https://kakaobank.com/static/images/web/renewal/main-26weeks.png",
		"userId" : "user01",
		"imgName" : "26"
	},
	{
		"imgId" : "00002",
		"imgUrl" : "https://kakaobank.com/static/images/web/renewal/main-26weeks.png",
		"userId" : "user02",
		"imgName" : ""
	},
	{
		"imgId" : "00003",
		"imgUrl" : "https://kakaobank.com/static/images/web/renewal/main-26weeks.png",
		"userId" : "user03",
		"imgName" : "3333"
	}
];

let btnApproval = document.querySelector('.btn-approval');
let btnRefusal = document.querySelector('.btn-refusal');
let btnRefusalConfirm = document.querySelector('.btn-refusal-confirm');
let inputRefusal = document.querySelector('.input-refusal');

const imgCheckTool = {
	startIdx : 0,
	data : '',
	imgId : '',
	refusalMessageTxt : '',
	approvalList : [],
	refusalList : [],
	checkImgInfo : [],
	toolDisabled : false,
	init : function (data) {
		let _this = this;
		this.data = data;
		this.data.forEach((i)=> {
			_this.checkImgInfo = [..._this.checkImgInfo, {
				imgId : i.imgId,
				result : ''
			}];
		});

		this.render(this.startIdx);
	},
	render : function (index) {
		let imgFigure = document.querySelector('.img-wrap');
		let imgTag = document.createElement('img');
		let figCaptionTag = document.createElement('figcaption');
		
		if (this.data[index]) {
			this.imgId = this.data[index].imgId;
			let imgAttr = ['src', 'alt'];
			let imgAttrContent = [this.data[index].imgUrl, this.data[index].imgName];

			imgAttr.forEach((i,idx)=> {
				imgTag.setAttribute(imgAttr[idx], imgAttrContent[idx]);
				figCaptionTag.innerText = this.data[index].imgId;
			});

			imgFigure.append(imgTag);
			imgFigure.append(figCaptionTag);
		}
	},
	reset : function () {
		let imgFigure = document.querySelector('.img-wrap');
		imgFigure.innerHTML = '';
		
		this.uiReset();
	},
	uiReset : function () {
		inputRefusal.value = '';
		btnApproval.disabled = false;
		inputRefusal.disabled = true;
		btnRefusalConfirm.disabled = true;
	},
	next : function () {
		this.startIdx++;
		if (this.startIdx < this.data.length) {
			this.reset();
			this.render(this.startIdx);
		}else {
			this.toolDisabled = true;
			this.uiReset();
		}
	},
	// 승인
	checkApproval : function () {
		if (!this.toolDisabled) {
			let _this = this;
			this.approvalList = [...this.approvalList,this.imgId];

			this.checkImgInfo.filter((i,idx)=>{
				if (_this.startIdx === idx) i.result = 'approval';
			});

			this.next();
		}
	},
	// 거절
	refusalCheck : function () {
		if (!this.toolDisabled) {
			btnApproval.disabled = true;
			inputRefusal.disabled = false;
			btnRefusalConfirm.disabled = false;
		}
	},
	// 거절 확인
	checkRefusal: function () {
		if (!this.toolDisabled) {
			let _this = this;
			this.refusalList = [...this.refusalList,this.imgId];
			
			this.checkImgInfo.filter((i,idx)=>{
				if (_this.startIdx === idx) {
					i.result = 'refusal';
					i.resultTxt = this.refusalMessageTxt;
				}
			});

			this.next();
		}
	},
	// 거절메세지
	refusalMessage: function (txt) {
		this.refusalMessageTxt = txt;
	},
	// 모든 이미지 검수결과 가져오기
	getAllImgInfo : function () {
		console.log('결과 : ', this.checkImgInfo);
	},
	// 승인된 이미지 정보 가져오기
	getApprovalImgInfo : function () {
		let _this = this;
		let result = [];
		this.approvalList.forEach((i)=>{
			_this.data.filter((j)=>{
				if (j.imgId === i) result.push(j);
			})
		});

		console.log('승인된 이미지 : ', result);
	},
	// 거절된 이미지 정보 가져오기
	getRefusalImgInfo : function () {
		let _this = this;
		let result = [];
		this.refusalList.forEach((i)=>{
			_this.data.filter((j)=>{
				if (j.imgId === i) result.push(j);
			})
		});

		console.log('거절된 이미지 : ', result);
	},
	// 특정 이미지 정보 가져오기
	getTargetImgInfo : function (id) {
		this.checkImgInfo.find((i)=>{
			if (id === i.imgId) console.log(i);
		});
	}
}

imgCheckTool.init(imgCollection);