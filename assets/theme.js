$(document).on('click', '.ajax-submit', function (e) {
  e.preventDefault();
  const $addToCartForm = $(this).closest('form');
  const $addToCartBtn = $addToCartForm.find('.atc');
  const $addToCartBtnText = $addToCartForm.find('.atc .atc-text');
  const $atcSubmittedText = $addToCartForm.find('.atc .submitted-text');
  if ($('body').hasClass('cart')) {
    $addToCartForm.submit();
  }
  $.ajax({
    url: '/cart/add.js',
    dataType: 'json',
    cache: false,
    type: 'post',
    data: $addToCartForm.serialize(),
    beforeSend() {
      $addToCartBtn.attr('disabled', 'disabled').addClass('disabled');
    },
    success() {
      $atcSubmittedText.removeClass('hide');
      $addToCartBtnText.addClass('hide')
      window.setTimeout(() => {
        $addToCartBtn.removeAttr('disabled').removeClass('disabled');
        $atcSubmittedText.addClass('hide');
        $addToCartBtnText.removeClass('hide')
      }, 2000)
    },
  });
  return false;
});


// cart


document.querySelectorAll('.cart-item-remove').forEach((remove) => {
  remove.addEventListener('click', (e) => {
    e.preventDefault;
    const item = remove.closest('.cart-row')
    const key = item.getAttribute('item-product-key')
    axios.post('/cart/change.js', {
      id: key,
      quantity: 0,
    }).then((res) => {
      item.remove();
    })
  })
});


document.querySelectorAll(".quantity-box .control").forEach((control) => {
  control.addEventListener('click', () => {
      let input = control.parentElement.querySelector('input');
      let value = Number(input.value)
      let isPlus = control.classList.contains('plus');
      if (isPlus) {
          let newValue = value + 1;
          input.value = newValue;
      }else if (value > 1) {
          let newValue = value - 1;
          input.value = newValue;
      }
  });
});



// product variant



// money format

var formatMoney = function(cents, format) {
  if (typeof cents == 'string') { cents = cents.replace('.',''); }
  var value = '';
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  var formatString = (format || this.money_format);

  function defaultOption(opt, def) {
     return (typeof opt == 'undefined' ? def : opt);
  }

  function formatWithDelimiters(number, precision, thousands, decimal) {
    precision = defaultOption(precision, 2);
    thousands = defaultOption(thousands, ',');
    decimal   = defaultOption(decimal, '.');

    if (isNaN(number) || number == null) { return 0; }

    number = (number/100.0).toFixed(precision);

    var parts   = number.split('.'),
        dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
        cents   = parts[1] ? (decimal + parts[1]) : '';

    return dollars + cents;
  }

  switch(formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
  }

  return formatString.replace(placeholderRegex, value);
};

