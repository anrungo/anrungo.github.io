# anrungo.github.io

## Personal Website

Site pessoal de Antonio Rungo (<https://antoniorungo.com>), construído com [Quarto](https://quarto.org).

## Estrutura

Esta pasta é o repositório git de `anrungo/anrungo.github.io`, com dois branches:

- **`source`** (branch de trabalho) — código-fonte: `.qmd`, `assets/`, `_quarto.yml`, `openspec/`. É aqui que se edita e se fazem commits normais.
- **`master`** (branch publicado) — o site renderizado que o GitHub Pages serve. Gerido automaticamente pelo `publish.ps1` através do worktree `.deploy\` (ignorado pelo git no `source`). Contém também conteúdo que **não** vem deste projeto: `resume/` (projeto do CV), `CNAME`, `.nojekyll`, `robots.txt` — o script nunca os apaga.

A antiga pasta de publicação manual (`D:\GitHub\anrungo.github.io`) está reformada e pode ser removida.

## Como publicar

Um único comando, a partir desta pasta:

```powershell
.\publish.ps1                        # mensagem de commit automática
.\publish.ps1 -Message "Add book"    # mensagem personalizada
```

O script faz: `quarto render` → sincroniza o worktree `.deploy\` com `origin/master` → copia `_site\*` por cima (sem apagar `resume/` etc.) → `git add/commit/push` do `master`. O site fica no ar em <https://antoniorungo.com> poucos minutos depois do push.

## Pré-visualizar localmente

```powershell
& "$env:LOCALAPPDATA\Programs\Quarto\bin\quarto.cmd" preview
```

## Planeamento (OpenSpec)

As mudanças são planeadas com OpenSpec em `openspec/changes/` (arquivadas em `openspec/changes/archive/`). Histórico: migração para Quarto (2026-06-22), link do CV (2026-06-23), secção do livro na homepage (2026-07).
