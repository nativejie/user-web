<template>
    <div class="privacy flex_c_c">
        <div class="dia_body">
          <i @click="handleClose" class="el-icon-close"></i>
          <!-- <div v-if="content" class="content" v-html="content"></div> -->
          <div class="content">
            <h1 class="privacy_title">Privacy Policy</h1>
            <h2>What personal data we collect and why we collect it</h2>
            <p class="subtitle">1. PRIVACY STATEMENT</p>
            <p>Pokidol is committed to preserving the privacy of all visitors to our website. In particular, we would you to know that Pokidol is not in the business of selling, renting of trading email lists with other companies for marketing purposes. We hope that this Privacy Policy helps you to understand when and why we collect personal data.</p>
            <p class="subtitle">2. GATHERING OF SYSTEM INFORMATION</p>
            <p>When you use www.pokidol.com services we track your activity on our website. Your personal information is used to identify you in our system, allowing www.pokidol.com to contact you about the status of your order or respond to your questions via e-mail or telephone, and to allow you to store your basic information for repeat checkouts.</p>
            <p>We also use the information gathered from tracking user activities to improve our service. We also track your Internet Protocol (IP) address, domain name (if applicable), browser type, session duration, and transaction data, which is available to any site to which you connect. www.pokidol.com uses this information to administer the site and to further improve our service to you.</p>
            <p class="subtitle">3. FULFILLING ORDERS</p>
            <p>For us to fulfill an order we require the following information: Name, Address, Telephone Number and Email Address</p>
            <p>We work with several suppliers to fulfill orders. We will pass on delivery information such as name, address and telephone number to a www.pokidol.com suppliers/partner(s) so they can supply goods and services to you. Our suppliers/partners will use your name, address and telephone number to pass on to couriers and postal services so that your order can be sent to you.</p>
            <p>If you wish to have information on your details held with our suppliers please email us.</p>
            <p class="subtitle">4. TRACKING OF COOKIES</p>
            <p>A cookie is a small file which is placed on your computer's hard drive. The file is added and the cookie helps analyse web traffic or lets you know when you visit a particular site. Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs, likes and dislikes by gathering and remembering information about your preferences.</p>
            <p>We use traffic log cookies to identify which pages are being used. This helps us analyse data about web page traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system.</p>
            <p>Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us.</p>
            <p>Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.</p>
            <p>We also use cookies to track visitors' interest in our products. We sometimes use this to understand our customers needs and make our offers as appropriate as possible. We do use some behavioural marketing techniques. So if you've visited a page and taken some interest in a product we use these type of cookies to remind you of what you were looking at. For example; you might get add something to the cart, but then the phone rings and afterwards you completely forget to go back and complete the checkout process. This is where we might send you and email or you may see us advertising that product whilst visiting another website. Please note that all cookie data is anonymised and stored temporarily.</p>
            <p class="subtitle">5. CUSTOMER IDENTIFIABLE INFORMATION</p>
            <p>Our site's order form requires users to give us contact information, such as an email address or telephone number. This information is used to help us serve you better, in particular to contact you if we have any queries with your order. It is never shared with third parties, other than to process your order as detailed in point 3 of our Privacy Policy.</p>
            <p class="subtitle">6. MAILING LIST & MARKETING</p>
            <p>As part of the registration process for freebies, offers, discounts and newsletters, we collect your email and name. We use that to initially send you the information you asked for. We also use it to send follow up marketing emails (which we are always transparent about at the time of signing up). Our marketing emails will contain information that we believe are of legitimate interest to you, such as new products, discounts and offers. We also use it to check every now and then that you're happy and satisfied. We don't rent or trade email lists with other organisations and businesses.</p>
            <p>We use a third-party provider, MailChimp, to deliver our newsletter. We gather statistics around email opening and clicks using industry standard technologies to help us monitor and improve our e-newsletter. You can unsubscribe to general mailings at any time of the day or night by clicking the unsubscribe link at the bottom of any of our emails or by emailing us.</p>
            <p class="subtitle">7. FEEDBACK REQUESTS</p>
            <p>As part of our customer service we send out review requests using the email address you supply us with at the time of order. It is entirely up to you if you choose to leave us a review. Once the review time has passed you will not hear from us again unless you have signed up to receive our offers or newsletter by email. We use Trusted Shops to help us automate our requests for reviews.</p>
            <p class="subtitle">8. LIVE CHAT</p>
            <p>We use MyLiveChat if customers wish to contact us by this method with any queries. Your email address and name is required at the time of enquiry but is not stored or used for any future purpose unless agreed. This may include us emailing you some information if you have requested it after the Live Chat session has ended.</p>
            <p class="subtitle">9. UPDATE POLICY</p>
            <p>This site gives users the following options for changing and modifying information previously provided:</p>
            <p>Log in to your account with the account login link on our website. Upon entering your registered email and password, you are free to edit or remove your information at any time.</p>
            <p>If you have trouble editing or removing your details for any reason, simply contact us with your change request through the Contact Us form on our website.</p>
            <p class="subtitle">10. CONTACTING THIS WEBSITE</p>
            <p>If you have any questions about this privacy statement, the practices of this site, or your dealings with <span class="link link2">www.pokidol.com</span>, you can contact us by email.</p>
          </div>
        </div>
      </div>
  </template>
  
  <script>
  export default {
    data () {
      return {
        content: '',
        elementContentList: '',
      }
    },
    created () {
      this.elementContentList = window.elementContentList
      this.content = this.elementContentList.login_privacy
    },
    methods: {
      handleClose() {
        this.$parent.showPrivacy = false
      },
    },
  }
  </script>
  
  <style lang="scss">
  
  .privacy{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 2;
    font-size: 14px;
    color: #3d3d3d;
    line-height: 22px;
      .dia_body{
      width: 1000px;
      height: 700px;
      background: #fff;
      border-radius: 24px;
      padding: 24px 8px 24px 24px;
      position: relative;
      .content{
        height: 100%;
        padding-right: 12px;
        overflow-y: scroll;
      }
      .el-icon-close{
        font-size: 26px;
        position: absolute;
        right: 12px;
        top: 12px;
        cursor: pointer;
      }
      h1{
        font-size: 40px;
        margin: 12px 0;
        line-height: 46px;
      }
      .subtitle{
        font-weight: 600;
        line-height: 24px;
        margin: 8px 0;
      }
      .link{
        color: #F6497F;
        cursor: pointer;
        text-decoration: underline;
      }
      .link2{
        cursor: text;
      }
    }
  }
  // p{margin: 0;}
  </style>
  
  