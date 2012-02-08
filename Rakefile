task :build do
  run "coffee -c --bare -p lib/main.coffee > output/main.user.js"
end

def run(cmd)
  puts cmd
  system cmd
end

