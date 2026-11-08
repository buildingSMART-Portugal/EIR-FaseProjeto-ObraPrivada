# buildingSMART Portugal

## EIR

[![Versão / Version](https://img.shields.io/github/v/tag/buildingSMART-Portugal/EIR-FaseProjeto-ObraPrivada?sort=semver&label=vers%C3%A3o%20%2F%20version)](https://buildingsmart-portugal.github.io/EIR-FaseProjeto-ObraPrivada/alteracoes/)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.14547997.svg)](https://doi.org/10.5281/zenodo.14547997)
[![Publish website and PDFs](https://github.com/buildingSMART-Portugal/EIR-FaseProjeto-ObraPrivada/actions/workflows/publish.yml/badge.svg)](https://github.com/buildingSMART-Portugal/EIR-FaseProjeto-ObraPrivada/actions/workflows/publish.yml)

| | Português | English |
| --- | --- | --- |
| Website | [Ver EIR online](https://buildingsmart-portugal.github.io/EIR-FaseProjeto-ObraPrivada/) | [View EIR online](https://buildingsmart-portugal.github.io/EIR-FaseProjeto-ObraPrivada/en/) |
| PDF | [Descarregar PDF](https://buildingsmart-portugal.github.io/EIR-FaseProjeto-ObraPrivada/pdf/EIR-PT.pdf) | [Download PDF](https://buildingsmart-portugal.github.io/EIR-FaseProjeto-ObraPrivada/pdf/EIR-EN.pdf) |
| Markdown | [EIR.md](EIR.md) | [EIR-EN.md](EIR-EN.md) |
| Histórico / History | [Alterações entre versões](https://buildingsmart-portugal.github.io/EIR-FaseProjeto-ObraPrivada/alteracoes/) | [Changes between versions](https://buildingsmart-portugal.github.io/EIR-FaseProjeto-ObraPrivada/en/changes/) |

As tabelas de Nível de Informação Necessário e a informação de suporte continuam no Google Drive (ligações no próprio documento).

## Autores

* [Andressa Oliveira](mailto:soliveira.andressa@gmail.com)
* [Débora Pinto](mailto:debora.pinto@builtcolab.pt)
* [Filipe Lima](mailto:fl@limsen.com)
* [Hugo Silva](mailto:hmcsilva@gmail.com)
* [Inês Rodrigues](mailto:inesrodrigues@plo.pt)
* [João Fonseca](mailto:)
* [João Neves Adelino](mailto:jnadelino@wearereify.com)
* [João Poças Martins](mailto:joao.pocas.martins@gmail.com)
* [José Carlos Lino](mailto:jcb.lino@gmail.com)
* [José Granja](mailto:granja@civil.uminho.pt)
* [Luís Ribeirinho Soares](mailto:luis.ribeirinho@tpf.pt)
* [Manuel Parente](mailto:map@civil.uminho.pt)
* [Marta Campos](mailto:marta.a.campos@gmail.com)
* [Marta Meirinhos](mailto:martameirinhos.arq@gmail.com)
* [Miguel Azenha](mailto:miguel.azenha@gmail.com)
* [Paula Assis](mailto:paula.assis@topinformatica.pt)
* [Pedro Martins](mailto:pedro.martins@builtcolab.pt)
* [Ricardo Figueira](mailto:ricardo.figueira@topinformatica.pt)
* [Ricardo Reis](mailto:ricardo.reis@xispoli.eu)
* [Rita Andrade](mailto:rita.andrade@rcapd.com)
* [Sebástien Roux](mailto:sr@limsen.com)
* [Sofia Henriques](mailto:sofiabhenriques@gmail.com)

## Citation

Granja, J., Oliveira, A., Pinto, D., Lima, F., Silva, H., Rodrigues, I., Fonseca, J., Neves Adelino, J., Poças Martins, J., Lino, J. C., Ribeirinho, L., Parente, M., Campos, M., Meirinhos, M., Assis, P., Martins, P., Figueira, R., Reis, R., Andrade, R., Roux, S., Henriques, S., & Azenha, M. (2024). EIR para a fase de projeto de uma obra privada. BuildingSMART Portugal. https://doi.org/10.5281/zenodo.14547997

## Website e PDF / Website and PDF

`EIR.md` e `EIR-EN.md` são a única fonte do conteúdo. A cada *push* para `main`, o GitHub Actions ([publish.yml](.github/workflows/publish.yml)) gera o website bilingue e os dois PDFs e publica-os no GitHub Pages. Basta editar os ficheiros Markdown.

`EIR.md` and `EIR-EN.md` are the only source of content. On every push to `main`, GitHub Actions builds the bilingual website and both PDFs and publishes them to GitHub Pages. Just edit the Markdown files.

Para pré-visualizar localmente / To preview locally (Node.js 20+):

```bash
cd site
npm install
npx playwright install chromium
npm run all     # website + PDFs in ../_site
npm run serve   # http://localhost:4173
```

## Versões / Versions

A versão vem do Git, não do texto: ninguém precisa de editar números de versão nos ficheiros Markdown.

The version comes from Git, not from the text: nobody edits version numbers in the Markdown files.

* **Publicar uma versão / Publish a version:** GitHub → *Releases* → *Draft a new release* → tag `v1.2.0` (target `main`) → write short release notes → *Publish release*. The website is rebuilt as **v1.2.0**, the release notes appear on the version history page and both PDFs are attached to the release. If the Zenodo–GitHub integration is enabled, Zenodo also archives the release with its own DOI.
* **Entre versões / Between releases:** every commit to `main` is published straight away and labelled automatically, e.g. **1.1.3+2 · versão de trabalho / working draft** (2 commits changed the text since v1.1.3), with the date and commit of the latest change. Each language is versioned on its own, so a fix in the English text does not mark the Portuguese one as a draft.
* **Numeração / Numbering** (semantic versioning): `v1.1.4` for corrections and small clarifications, `v1.2.0` for new or changed requirements, `v2.0.0` for a restructured document.
* **Ver alterações / See changes:** the version history page compares any two versions, section by section, with word-level highlights. It is built from the Git tags, so older releases are included as well.

Notas para quem edita / Notes for editors:

* The hand-written `# Índice` / `# Content` list is replaced by the generated navigation.
* Keep the PT and EN files with the same heading structure, so the PT/EN switch can keep the reader on the same section.
* Titles, labels and the cover text are in `site/build.mjs` (`LANGS`); authors come from `CITATION.cff`, the citation from this README.
* The PDF cover, running header and footer follow the buildingSMART Portugal Word template; the logo, icons and the cover background (redrawn as vector) are in `site/src/brand/`.
