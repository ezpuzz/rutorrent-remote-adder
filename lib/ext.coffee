class Util
  # reopenClass(Class, attrs)
  @reopenClass = (klass, attrs, overwrite) ->
    for own k, v of attrs
      unless klass[k]
        Object.defineProperty(klass, k, value: v, writable: true)
