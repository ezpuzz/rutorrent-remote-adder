# lib/*.coffee
watch %r~lib/.*\.coffee~ do |m|
  run "coffee -c --bare -o tmp #{m[0]}"
  run "cat tmp/*.js > output/saber-addtorrent.user.js"
  run "sed -n '1,/UserScript/p' output/saber-addtorrent.user.js > output/saber-addtorrent.meta.js"
end

def run(cmd)
  puts cmd
  system cmd
end
