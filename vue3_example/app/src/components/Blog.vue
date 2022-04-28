
    hipassTokenList : [], 
    skpToken : '', // 레몬패스 결제시 토큰정보




<select class="basic_input browser-default w100p" v-model="skpToken">
    <option value="" disabled selected>카드 선택</option>
    <template v-for="token in hipassTokenList">
        <option value="token">{{token.cardNm}}</option>
    </template>
</select>



/**
    * KOCES_LEMON_PASS 결제 프로세스 영역
    */
startKocesLemonPassPaymentProcess : function () {
    /*TODO
        skpToken 선택여부,
        토큰 유효기간,
            유효기간 만료시 ?? 다른 토큰 선택 또는 토큰 등록페이지로 이동??
        비밀번호 등록여부,
            미등록시 등록 팝업 ?
        비밀번호 입력
        로딩바 1/n
        승인요청
            validation 토큰유효성, 비밀번호 검증
            승인 -> 수납알림
        */
    if (!this.skpToken) {
        this.$commonAlert(`결제할 카드를 선택해 주세요.`);
        return false;
    } else if (new Date(this.$dateFormatter(this.skpToken.endDt, 'yyyy-mm-dd')) < new Date()){
        this.$commonAlert(`등록한 카드에 결제가능한 기간을 확인해 주세요.`);
        // TODO 다른 토큰 선택 or 토큰 등록 페이지로 이동
        return false;
    }
    // TODO 비밀번호 등록 여부
    // 미등록시
    // 비밀번호 입력 팝업
    let options = {
        title: '<a href="javascript:;">토큰 비밀번호 등록</a>',
        text: `<div class="data_ip_area">
                    <div class="input-field col s12">
                        <input id="token_password" type="password" maxlength="20">
                        <label for="token_password" class="active">비밀번호</label>
                    </div>
                    <div class="input-field col s12">
                        <input id="token_password_check" type="password" maxlength="20">
                        <label for="token_password_check" class="active">비밀번호 확인</label>
                        </div>
                    </div>`,
        confirm: true,
        confirmTxt: '저장',
        callback: function() {
            if (this.validateTokenPassword()){
                const tokenPasswordParam = {
                    patientId : this.patientId,
                    cardToken : this.skpToken,
                }
                this.$customAxios('', tokenPasswordParam, this.getKocesHashDataCallback);
            }
        },
        cancel: true,
        cancelTxt: '취소',
        cancelCallback: function() {
            this.skpToken = '';
        },
        dismissible: true
    };
    Vue.prototype.$mcareModal(options);
    M.updateTextFields();

    let payOptions = {
    title: '<a href="javascript:;">결제 비밀번호 확인</a>',
    text: `<div class="data_ip_area">
                <div class="input-field col s12">
                    <input id="approval_token_password" type="number" pattern="[0-9]*" inputmode="numeric" 
                        maxlength="6" oninput="Vue.prototype.$maxLengthCheck(this)" class="number_password">
                    <label for="approval_token_password" class="active">비밀번호</label>
                </div>
                </div>`,
    confirm: true,
    confirmTxt: '확인',
    callback: function() {
    
    },
    cancel: true,
    cancelTxt: '취소',
    cancelCallback: function() {
        this.skpToken = '';
    },
    dismissible: true
};
Vue.prototype.$mcareModal(payOptions);
M.updateTextFields();
