(($) ->
  class BuscaCep
    constructor: (@$el, options)->
      @_url = options.url
      @returnConverter = options.returnConverter
      @find('[data-endereco-cep]').on 'blur', (e)=>
        @getCep e.target.value

    find: (s)-> @$el.find(s)

    setVal: (selector, value)->
      @find(selector).val value

    getCep: (cep)->
      cep = cep.replace /\D/g, ''
      url = @_url.replace ':cep', cep
      if cep
        @setMessage()
        $.get url, (data)=>
          @populate data

    populate: (data)->
      data = @returnConverter(data)
      if data.city
        @setVal '[data-endereco-cidade-id]', data.city.id 
        name = data.city.nome
        @setVal '[data-endereco-cidade]', name
        @setVal '[placeholder=Cidade]', name
      @setVal '[data-endereco-logradouro]', data.street.nome if data.street
      @setVal '[data-endereco-bairro]', data.neighborhood.nome if data.neighborhood
      if Number(data.resultado) != 1
        @setMessage data.message

    setMessage: (msg)->
      el = @find('[data-endereco-message]')
      if msg
        el.addClass('alert alert-warning').html msg
      else
        el.removeClass('alert alert-warning').html ''

  $.buscaCep = (el, options) ->
    base = this
    base.$el = $(el)
    base.el = el
    base.$el.data "buscaCep", base
    base.init = ->
      base.options = $.extend({}, $.buscaCep.defaultOptions, options)
      new BuscaCep base.$el, base.options

    base.init()

  $.buscaCep.defaultOptions =
    url: '/api/addresses/cep/:cep.json'
    returnConverter: (data)->
      data

  $.fn.buscaCep = (options) ->
    @each ->
      new $.buscaCep(this, options)
) jQuery
