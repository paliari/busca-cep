class BuscaCep
  @init = (url, format)->
    BuscaCep.URL = url || '/api/address/cep/:cep.json'
    BuscaCep.format = format ||
      cidade_id: 'city.id'
      cidade: 'city'
      cidade_nome: 'city.nome'
      cidade_uf: 'city.uf'
      logradouro: 'street.nome'
      bairro: 'neighborhood.nome'
      mensagem: 'message'
      resultado: 'resultado'

  constructor: (@$el)->
    @_url = BuscaCep.URL
    @find('[data-endereco-cep]').on 'blur', (e)=>
      @get e.target.value

  find: (s)-> @$el.find(s)

  get: (cep)->
    cep = cep.replace /\D/g, ''
    url = @_url.replace ':cep', cep
    if cep
      @setMessage()
      $.get url, (data)=>
        @populate data

  populate: (data)->
    data = @convertData(data)
    console.log data
    @find('[data-endereco-cidade-id]').val data.cidade_id
    @find('[data-endereco-cidade]').val data.cidade_nome+'-'+data.cidade_uf
    @find('[data-endereco-logradouro]').val data.logradouro
    @find('[data-endereco-bairro]').val data.bairro
    if Number(data.resultado) != 1
      @setMessage data.mensagem

  setMessage: (msg)->
    el = @find('[data-endereco-message]')
    if msg
      el.addClass('alert alert-warning').html msg
    else
      el.removeClass('alert alert-warning').html ''

  convertData: (data)->
    ret = {}
    for k of BuscaCep.format
      v = @refObj data, BuscaCep.format[k]
      ret[k] = v
    ret

  refObj: (obj, str)->
    for i in str.split('.')
      obj = obj[i] if obj
    obj
