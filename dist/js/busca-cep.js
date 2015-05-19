(function() {
  var BuscaCep;

  BuscaCep = (function() {
    BuscaCep.init = function(url, format) {
      BuscaCep.URL = url || '/api/address/cep/:cep.json';
      return BuscaCep.format = format || {
        cidade_id: 'city.id',
        cidade: 'city',
        cidade_nome: 'city.nome',
        cidade_uf: 'city.uf',
        logradouro: 'street.nome',
        bairro: 'neighborhood.nome',
        mensagem: 'message',
        resultado: 'resultado'
      };
    };

    function BuscaCep($el) {
      this.$el = $el;
      this._url = BuscaCep.URL;
      this.find('[data-endereco-cep]').on('blur', (function(_this) {
        return function(e) {
          return _this.get(e.target.value);
        };
      })(this));
    }

    BuscaCep.prototype.find = function(s) {
      return this.$el.find(s);
    };

    BuscaCep.prototype.get = function(cep) {
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
      data = this.convertData(data);
      console.log(data);
      this.find('[data-endereco-cidade-id]').val(data.cidade_id);
      this.find('[data-endereco-cidade]').val(data.cidade_nome + '-' + data.cidade_uf);
      this.find('[data-endereco-logradouro]').val(data.logradouro);
      this.find('[data-endereco-bairro]').val(data.bairro);
      if (Number(data.resultado) !== 1) {
        return this.setMessage(data.mensagem);
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

    BuscaCep.prototype.convertData = function(data) {
      var k, ret, v;
      ret = {};
      for (k in BuscaCep.format) {
        v = this.refObj(data, BuscaCep.format[k]);
        ret[k] = v;
      }
      return ret;
    };

    BuscaCep.prototype.refObj = function(obj, str) {
      var i, j, len, ref;
      ref = str.split('.');
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        if (obj) {
          obj = obj[i];
        }
      }
      return obj;
    };

    return BuscaCep;

  })();

}).call(this);
