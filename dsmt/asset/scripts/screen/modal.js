var Modals = function () {
  var $window = $(window);
  var $document = $(document);
  var $modals = $('.layer-popup');
  var $baseContentsArea = $('.skip-to-content-link,#dsmtHeader,#dsmtContents,.page-key-visual,#dsmtLnb,#fabButton,#dsmtFooter'),
    $baseContentsClickable;
  var $ctrl,
    saveScrollTop,
    isKeyDown = false;
  var isModalShow = false;
  var init = function init() {
    $document.on('click.openModal', '.modal_controller', openModal);
    $modalContent = $modals.find('.layer-content-area');
    $modals.find('.layer-close_button > a, .layer-close_button > button, .layer-close_area').on('click.modalHide', hide).on('keydown.modalHide', hideKeyDown);
    return this;
  };
  var openModal = function openModal() {
    $ctrl = this;
    var target = $(this).attr('data-target') || this.dataset.target || this.getAttribute('href');
    show(target);
    return false;
  };
  var show = function show(target) {
    var $target = $(target);
    if (!$target.length) return false;
    Accessibillity.on();
    isKeyDown = false;
    isModalShow = true;
    $modals.addClass('show').attr('aria-hidden', false);
    saveScrollTop = $window.scrollTop();
    $('html,body').addClass('no-scroll');
    $modals.one('transitionend', shown);
    setTimeout(function () {
      $modals.find('.layer-close_button a,.layer-close_button button').focus();
    }, 300);
  };
  var shown = function shown() {
    $modals.addClass('show-end');
  };
  var hide = function hide() {
    $modals.removeClass('show');
    $window.off('resize.modals');
    Accessibillity.off();
    setTimeout(function () {
      $('html,body').removeClass('no-scroll');
      $('html,body').scrollTop(saveScrollTop);
      $ctrl && $ctrl.focus();
      $ctrl = null;
      isKeyDown = false;
    }, 0);
    $modals.removeClass('show-end');
    isModalShow = false;
    return false;
  };
  var hideKeyDown = function hideKeyDown(e) {
    if (e.keyCode == 13) {
      isKeyDown = true;
    }
  };
  var Accessibillity = {
    on: function on() {
      $baseContentsArea.attr('aria-hidden', 'true');
      $baseContentsClickable = $baseContentsArea.find('a,input,select,textarea,button,video,iframe,iframe *,svg,use');
      $baseContentsClickable.each(function () {
        var tabindex = $(this).attr('tabindex');
        if (tabindex !== undefined && tabindex !== null) {
          $(this).data('prev-tabindex', tabindex);
        }
        $(this).attr('tabindex', '-1');
      });
    },
    off: function off() {
      $baseContentsArea.removeAttr('aria-hidden');
      $baseContentsClickable.each(function () {
        var tabindex = $(this).data('prev-tabindex');
        if (tabindex !== undefined && tabindex !== null) {
          $(this).attr('tabindex', tabindex);
        } else {
          $(this).removeAttr('tabindex');
        }
      });
    }
  };
  return {
    init: init,
    show: show,
    hide: hide
  };
}();