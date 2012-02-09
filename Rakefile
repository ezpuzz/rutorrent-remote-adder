task :build do
  run "coffee -c --bare -o tmp lib"
  run "cat tmp/*.js > output/saber-addtorrent.user.js"
end

task :watch do
  run "watchr saber-addtorrent.watchr"
end

task :server do
  run "bpm preview --port 4020 &>/dev/null &"
end

def run(cmd)
  puts cmd
  system cmd
end
