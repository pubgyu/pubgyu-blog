let result = {};
const stepContent = [
    [
        `<div class="info-txt type-small">
            <span class="aa">Question</span>
            <strong class="tit">
                평소 몇 개의은행을 이용하고 계신가요?
            </strong>
        </div>
        <div class="select-list">
            <ul>
                <li>0</li>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
            </ul>
        </div>
        `
    ],
    [
        `<div class="info-txt type-small">
            <span class="aa">Question</span>
            <strong class="tit">
                결정적으로 카카오뱅크 전월세보증금대출 상품을
                선택하게 된 주된 이유는 무엇입니까? (중복 선택 가능,최대 3개)
            </strong>
        </div>
        <div class="check-list">
            <ul>
                <li>
                    <input name="reason" id="check1" type="checkbox">
                    <label for="check1">
                        <strong>대출금리가 낮아서</strong>
                        <span class="check-box">
                            <svg width="32" height="24" viewBox="0 0 32 24"><path fill-rule="evenodd" d="M11.168 18.402L28.569 1l2.195 2.195-19.51 19.51-.086-.086-.087.086L1 12.625l2.195-2.196 7.973 7.973z"/></svg>
                        </span>
                    </label>
                </li>
                <li>
                    <input name="reason" id="check2" type="checkbox">
                    <label for="check2">
                        <strong>대출한도가 높아서</strong>
                        <span class="check-box">
                            <svg width="32" height="24" viewBox="0 0 32 24"><path fill-rule="evenodd" d="M11.168 18.402L28.569 1l2.195 2.195-19.51 19.51-.086-.086-.087.086L1 12.625l2.195-2.196 7.973 7.973z"/></svg>
                        </span>
                    </label>
                </li>
                <li>
                    <input name="reason" id="check3" type="checkbox">
                    <label for="check3">
                        <strong>서류 제출 쉽고 간편해서</strong>
                        <span class="check-box">
                            <svg width="32" height="24" viewBox="0 0 32 24"><path fill-rule="evenodd" d="M11.168 18.402L28.569 1l2.195 2.195-19.51 19.51-.086-.086-.087.086L1 12.625l2.195-2.196 7.973 7.973z"/></svg>
                        </span>
                    </label>
                </li>
                <li>
                    <input name="reason" id="check4" type="checkbox">
                    <label for="check4">
                        <strong>주말이나 공휴일 등 원하는 날짜와 시간에 대출금을 보낼 수 있어서</strong>
                        <span class="check-box">
                            <svg width="32" height="24" viewBox="0 0 32 24"><path fill-rule="evenodd" d="M11.168 18.402L28.569 1l2.195 2.195-19.51 19.51-.086-.086-.087.086L1 12.625l2.195-2.196 7.973 7.973z"/></svg>
                        </span>
                    </label>
                </li>
                <li>
                    <input name="reason" id="etc" type="checkbox">
                    <label for="etc">
                        <strong>기타</strong>
                        <span class="check-box">
                            <svg width="32" height="24" viewBox="0 0 32 24"><path fill-rule="evenodd" d="M11.168 18.402L28.569 1l2.195 2.195-19.51 19.51-.086-.086-.087.086L1 12.625l2.195-2.196 7.973 7.973z"/></svg>
                        </span>
                    </label>

                    <div class="etc-info">
                        <div class="etc-textbox">
                            <label for="etc-text">선택한 이유</label>
                            <textarea id="etc-text" placeholder="텍스트 입력"></textarea>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="layer-popup">
            <div class="layer-con">
                <strong>최대 3개까지만<br> 선택하실 수 있습니다.</strong>
                <button class="btn-layer-close" type="button">확인</button>
            </div>
        </div>
       `
    ],
    [
        `<div class="info-txt type-small">
            <span class="aa">Question</span>
            <strong class="tit">
                카카오뱅크 전월세보증금 대출 상품을 이용하면서
                불편했던 사항이나 추가되었으면 하는 서비스/기능이
                있다면 자유롭게 의견을 남겨주세요.(200자 이내)
            </strong>
            <p class="desc">고객님의 소중한 의견은 더 좋은 전월세보증금 대출 상품을 제공 하는 데에 큰 도움이 됩니다.</p>
        </div>
        <div class="inconvenience-wrap">
            <textarea onKeyUp="inconvenienceEvent(event.target.value);" placeholder="의견을 남겨주세요. (선택)"></textarea>
        </div>
       `
    ],
    [
        `<div class="info-txt">
            <div class="tube-face-motion final"></div>
            <strong class="tit">
                설문에 참여해 주셔서<br> 감사합니다.
            </strong>
            <p class="desc">
                <em>스타벅스 기프티콘</em>은 9월 19일에 
                가입시 입력하신 휴대폰번호가 맞는지 [모바일앱 > 내정보]
                에서 미리 확인해주세요.
            </p>
        </div>
        <p class="description">
            &#8251; 카카오뱅크 전월세보증금 대출 상품을 이용 중인 고객이 아니면 설문에 참여하더라도 기프티콘을 받을수 없으니 이 점 유의해주세요.
        </p>
       `
    ]
]


const prograss = {
    step : 0,
    BtnNext : document.querySelector('.btn-next'),
    next : function () {
        const wrap = document.querySelector('#wrap');
        const content = document.querySelector('.content');
        let _this = this;

        if (_this.step < stepContent.length) {
            _this.BtnNext.innerText = '다음';
            _this.nextDisabled();

            content.innerHTML = '';
            content.innerHTML = stepContent[_this.step];
            _this.step++;
            if (_this.step === 1) selectEvnetStart();
            if (_this.step === 2) {
                wrap.classList.add('h-auto');
                checkEvnetStart();
            }
            if (_this.step === 3) {
                wrap.classList.remove('h-auto');
                _this.nextAbled();
            }
            if (_this.step === 4) {
                _this.BtnNext.innerText = '닫기';
                _this.nextAbled();
            }
        }else {
            getResponseResult();
        }
    },
    nextAbled : function () {
        let _this = this;
        _this.BtnNext.disabled = false;
        _this.BtnNext.classList.add('active');
    },
    nextDisabled : function () {
        let _this = this;
        _this.BtnNext.disabled = true;
        _this.BtnNext.classList.remove('active');   
    }
}

// 결과 반환
const getResponseResult = () => console.log('설문 응답 : ', result);


let selectList;
let selectListUl;
let selectListLi;
const selectEvnetStart = () => {
    selectList  = document.querySelector('.select-list');
    selectListUl  = selectList.querySelector('ul');
    selectListLi  = selectList.querySelector('li');
    
    selectEvnet.active(0);
    selectList.addEventListener('touchstart', e => selectEvnet.start(e));
    document.addEventListener('touchmove', e => selectEvnet.moving(e));
    document.addEventListener('touchend', e => selectEvnet.end());
}
const selectEvnet = {
    startY : 0,
    moveY : 0,
    endY : 0,
    moveArea : 0,
    maxH : 0,
    start : function (e) {
        this.startY = e.changedTouches[0].clientY;
        this.maxH = selectListUl.clientHeight - selectListLi.clientHeight;
        selectListUl.classList.remove('end');
    },
    moving : function (e) {
        this.moveY = e.changedTouches[0].clientY;
        let moving = (this.startY-this.moveY);
        
        this.moveArea = Math.min(this.maxH, Math.max(0,this.endY+moving));
        let moveIdx = Math.round((this.moveArea/selectListLi.clientHeight).toFixed(1)); 

        this.active(moveIdx);
        this.move(-this.moveArea);
        if (moveIdx !== 0) {
            prograss.nextAbled();
        }else {
            prograss.nextDisabled();
        }
        if (prograss.step === 1) result.useBankNum = moveIdx;
    },
    move : function(_move) {
        selectListUl.style.transform = `translateY(${_move}px)`;
    },
    end : function() {
        selectListUl.classList.add('end');
        this.endY = Array.from(selectList.querySelectorAll('li')).indexOf(document.querySelector('.active')) * selectListLi.clientHeight;
        this.move(-this.endY);
    },
    active : function (index) {
        selectListUl.querySelectorAll('li').forEach((_this,idx) => {
            if(idx === index) {
                _this.classList.add('active');
                _this.ariaSelected = true;
            }else {
                _this.classList.remove('active');
                _this.ariaSelected = false;
            }
        })
    }
}

const checkEvnetStart = () => {
    const check = document.querySelectorAll('input[type="checkbox"]');
    const layerPopup = document.querySelector('.layer-popup');
    const BtnLayerClose = layerPopup.querySelector('.btn-layer-close');

    let checkNum;
    const checkList = function (_this) {
        result.reason = [];
        checkNum = 0;
        check.forEach((_this)=>{
            checkNum = (_this.checked) ? checkNum + 1 : checkNum;
        });

        if (checkNum > 0) {
            prograss.nextAbled();
        }else {
            prograss.nextDisabled();
        }

        if (checkNum > 3) {
            _this.checked = false;
            layerPopup.style.display = 'block';
        }

        check.forEach((_this)=>{
            if(_this.checked) result.reason = [...result.reason, _this.closest('li').querySelector('label>strong').innerText];
        });

        let etcInfo = document.querySelector('.etc-info');
        let etcTextBox = document.querySelector('.etc-textbox');
        if (_this.id === 'etc') {
            if (_this.checked) {
                etcInfo.style.height = etcTextBox.clientHeight+'px';
                etcInfo.classList.add('on');
            }else {
                etcInfo.style.height = 0+'px';
                etcInfo.classList.remove('on');
                delete result.reasonEtcText;
            }
        }
    }
    check.forEach((_this)=>{
        _this.addEventListener('change', () => {
            checkList(_this);
        })
    });
    BtnLayerClose.addEventListener('click', () => {
        layerPopup.style.display = 'none';
    });
    let etcText = document.querySelector('#etc-text');
    etcText.addEventListener('keyup', () => {
        result.reasonEtcText = etcText.value;
    });
}

const inconvenienceEvent = (txt) => {
    result.inconvenienceText = txt;
}