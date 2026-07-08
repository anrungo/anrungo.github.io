# Publica o site a partir DESTA pasta: renderiza com Quarto e faz commit+push
# do resultado para o branch master (o que o GitHub Pages serve), atraves de
# um worktree git local em .deploy\ — nao e preciso nenhuma outra pasta.
#
# Uso:  .\publish.ps1                          (mensagem automatica com data)
#       .\publish.ps1 -Message "Add book"      (mensagem personalizada)
#
# O master tambem contem resume/, CNAME, .nojekyll e robots.txt que NAO vem
# deste projeto — a copia so adiciona/substitui, nunca apaga.

param([string]$Message = "Update site ($(Get-Date -Format 'yyyy-MM-dd HH:mm'))")

$ErrorActionPreference = "Stop"
$src = $PSScriptRoot
$deploy = Join-Path $src ".deploy"

# 1. Renderizar
$quarto = "quarto"
if (-not (Get-Command quarto -ErrorAction SilentlyContinue)) {
  $quarto = Join-Path $env:LOCALAPPDATA "Programs\Quarto\bin\quarto.cmd"
  if (-not (Test-Path $quarto)) { throw "Quarto nao encontrado" }
}
Write-Host "== quarto render ==" -ForegroundColor Cyan
& $quarto render
if ($LASTEXITCODE -ne 0) { throw "quarto render falhou" }

# 2. Preparar/sincronizar o worktree do master
Write-Host "== sincronizar worktree master (.deploy) ==" -ForegroundColor Cyan
git -C $src fetch origin master
if ($LASTEXITCODE -ne 0) { throw "git fetch falhou" }
if (-not (Test-Path (Join-Path $deploy ".git"))) {
  git -C $src worktree add $deploy master
  if ($LASTEXITCODE -ne 0) { throw "git worktree add falhou" }
}
git -C $deploy merge --ff-only origin/master
if ($LASTEXITCODE -ne 0) { throw "sincronizacao do master falhou (historico divergente — resolver manualmente)" }

# 3. Copiar o site renderizado (adiciona/substitui; nao apaga nada)
Write-Host "== copiar _site -> .deploy ==" -ForegroundColor Cyan
Copy-Item -Path (Join-Path $src "_site\*") -Destination $deploy -Recurse -Force

# 4. Commit e push
Write-Host "== git commit + push ==" -ForegroundColor Cyan
git -C $deploy add -A
git -C $deploy diff --cached --quiet
if ($LASTEXITCODE -eq 0) { Write-Host "Nada para publicar - site ja esta atualizado." -ForegroundColor Yellow; exit 0 }
git -C $deploy commit -m $Message
if ($LASTEXITCODE -ne 0) { throw "git commit falhou" }
git -C $deploy push origin master
if ($LASTEXITCODE -ne 0) { throw "git push falhou" }
Write-Host "Publicado: https://antoniorungo.com" -ForegroundColor Green
