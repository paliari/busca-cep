(function() {
  (function($) {
    var BuscaCep;
    BuscaCep = (function() {
      function BuscaCep($el, options) {
        this.$el = $el;
        this._url = options.url;
        this.returnConverter = options.returnConverter;
        this.find('[data-endereco-cep]').on('blur', (function(_this) {
          return function(e) {
            return _this.getCep(e.target.value);
          };
        })(this));
      }

      BuscaCep.prototype.find = function(s) {
        return this.$el.find(s);
      };

      BuscaCep.prototype.setVal = function(selector, value) {
        return this.find(selector).val(value);
      };

      BuscaCep.prototype.getCep = function(cep) {
        var url;
        cep = cep.replace(/\D/g, '');
        url = this._url.replace(':cep', cep);
        if (cep) {
          this.setMessage();
          return $.get(url, (function(_this) {
            return function(data) {
              return _this.populate(data);
            };
          })(this));
        }
      };

      BuscaCep.prototype.populate = function(data) {
        data = this.returnConverter(data);
        if (data.city) {
          this.setVal('[data-endereco-cidade-id]', data.city.id);
          this.setVal('[data-endereco-cidade]', data.city.nome + '-' + data.city.uf);
        }
        if (data.street) {
          this.setVal('[data-endereco-logradouro]', data.street.nome);
        }
        if (data.neighborhood) {
          this.setVal('[data-endereco-bairro]', data.neighborhood.nome);
        }
        if (Number(data.resultado) !== 1) {
          return this.setMessage(data.message);
        }
      };

      BuscaCep.prototype.setMessage = function(msg) {
        var el;
        el = this.find('[data-endereco-message]');
        if (msg) {
          return el.addClass('alert alert-warning').html(msg);
        } else {
          return el.removeClass('alert alert-warning').html('');
        }
      };

      return BuscaCep;

    })();
    $.buscaCep = function(el, options) {
      var base;
      base = this;
      base.$el = $(el);
      base.el = el;
      base.$el.data("buscaCep", base);
      base.init = function() {
        base.options = $.extend({}, $.buscaCep.defaultOptions, options);
        return new BuscaCep(base.$el, base.options);
      };
      return base.init();
    };
    $.buscaCep.defaultOptions = {
      url: '/api/address/cep/:cep.json',
      returnConverter: function(data) {
        return data;
      }
    };
    return $.fn.buscaCep = function(options) {
      return this.each(function() {
        return new $.buscaCep(this, options);
      });
    };
  })(jQuery);

}).call(this);
