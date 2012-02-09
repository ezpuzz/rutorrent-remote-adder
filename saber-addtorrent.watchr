# lib/main.coffee
watch %r~lib/.*\.coffee~ do |m|
  run "coffee -c --bare -o tmp #{m[0]}"
  run "cat tmp/*.js > output/saber-addtorrent.user.js"
end

def run(cmd)
  puts cmd
  system cmd
end
