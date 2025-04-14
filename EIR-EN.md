# V1.1.2 - 2024/11/28

# Content
- [Glossary](#glossary)
- [1. Introduction](#1-introduction)
- [2. Information Requirements](#2-information-requirements)
  - [2.1. Organisational Information Requirements (OIR)](#21-organisational-information-requirements-oir)
  - [2.2. Project Information Requirements (PIR)](#22-project-information-requirements-pir)
  - [2.3. Table of requirements](#23-table-of-requirements)
  - [2.4. Level of Information Need](#24-level-of-information-need)
- [3. Acceptance Criteria](#3-acceptance-criteria)
  - [3.1. Project Information Standards](#31-project-information-standards)
  - [3.2. Methods and Procedures for Producing Project Information](#32-methods-and-procedures-for-producing-project-information)
  - [3.3. Acceptance Table](#33-acceptance-table)
- [4. Support Information](#4-support-information)
  - [4.1. Reference Information](#41-reference-information)
  - [4.2. Shared resources](#42-shared-resources)
- [5. Dates, Information Delivery Milestones, and Control Points](#5-dates-information-delivery-milestones-and-key-decision-points)
- [Appendixes](#appendixes)
  - [Appendix A - Codes for naming information containers](#appendix-a---codes-for-naming-information-containers)
  - [Appendix B - Codes for information containers metadata](#appendix-b---codes-for-information-containers-metadata)


# Glossary

**Common Data Environment (CDE)**

Agreed source of information for any given project or asset, for collecting, managing and disseminating each information container through a managed process.

*NOTE 1: A CDE workflow describes the processes to be used and a CDE solution can provide the technology to support those processes.*

**Environmental Social and Governance (ESG)**

Environmental, social and governance indicators designed to assess the level of commitment of organisations to sustainable development objectives.

**Capability**

Measure of ability to perform and function.

*NOTE 1: In the context of this document, this relates to skill, knowledge or expertise to manage information.*

**Asset**

Item, thing or entity that has potential or actual value to an organization.

**Actor**

Person, organization or organizational unit involved in a construction process.

*NOTE 1: Organizational units include, but are not limited to, departments, teams.*

*NOTE 2: In the context of this document, construction processes take place during the delivery phase and the operational phase.*

**Information container**

Named persistent set of information retrievable from within a file, system or application storage hierarchy.

*EXAMPLE: Including sub-directory, information file (including model, document, table, schedule), or distinct sub-set of an information file such as a chapter or section, layer or symbol.*

*NOTE 1: Structured information containers include geometrical models, schedules and databases. Unstructured information containers include documentation, video clips and sound recordings.*

*NOTE 2: Persistent information exists over a timescale long enough for it to have to be managed, i.e. this excludes transient information such as internet search results.*

*NOTE 3: Naming of an information container should be according to an agreed naming convention.*

**Capacity**

Resources available to perform and function.

*NOTE 1: In the context of this document, this relates to means, resources and procedures to manage information.*

**Life cycle**

Life of the asset from the definition of its requirements to the termination of its use, covering its conception, development, operation, maintenance support and disposal.

**Appointment**

Agreed instruction for the provision of information concerning works, goods or services.

*NOTE 1: This term is used whether or not there is a formal appointment between the parties.*

**Acceptance criteria**

Evidence necessary to consider that the requirements have been met.

**Appointed Party**

Provider of information concerning works, goods or services.

*NOTE 1: A lead appointed party should be identified for each delivery team but this can be the same organization as one of the task teams.*

*NOTE 2: This term is used whether or not there is a formal written appointment in place.*

**Appointing Party**

Receiver of information concerning works, goods or services from a Lead Appointed Party.

*NOTE 1: In some countries the appointing party can be termed client, owner or employer but the appointing party is not limited to these functions.*

*NOTE 2: This term is used whether or not there is a formal appointment between the parties.*

**Delivery team**

Lead Appointed Party and their Appointed Parties.

*NOTE 1: A delivery team can be any size, from one person carrying out all the necessary functions through to complex, multi-layered task teams. The size and structure of each delivery team are in response to the scale and complexity of the asset management or project delivery activities.*

*NOTE 2: Multiple delivery teams can be appointed simultaneously and/or sequentially in connection with a single asset or project, in response to the scale and complexity of the asset management or project delivery activities.*
  
*NOTE 3: A delivery team can consist of multiple task teams from within the lead appointed party’s organization and any appointed parties.*

*NOTE 4: A delivery team can be assembled by the Appointing Party rather than the Lead Appointed Party.*

**Project team**

Appointing Party and all delivery teams.

**Task team**

Individuals assembled to perform a specific task

**Space**

Limited three-dimensional extent defined physically or notionally.

**Federation**

Creation of a composite information model (3.3.8) from separate information containers.

*NOTE 1: The separate information containers used during federation can come from different task teams.*

**Information**

Reinterpretable representation of data in a formalized manner suitable for communication, interpretation or processing.

*NOTE 1: Information can be processed by human or automatic means.*

**Project information**

Information produced for, or utilized in, a particular project.

**Information delivery milestone**

Scheduled event for a predefined information exchange.

**Building Information Modelling (BIM)**

Use of a shared digital representation of a built asset to facilitate design, construction and operation processes to form a reliable basis for decisions

*NOTE 1: Built assets include, but are not limited to, buildings, bridges, roads, process plants.*

**Information model**

Set of structured and unstructured information containers.

**Project Information Model (PIM)**

Information model relating to the delivery phase.

*NOTE 1: During the project, the project information model can be used to convey the design intent (sometimes called the design intent model) or the virtual representation of the asset to be constructed (sometimes called the virtual construction model).*

**Level of information need**

Framework which defines the extent and granularity of information.

*NOTE 1 : One purpose of defining the level of information need is to prevent delivery of too much information.*

**Delivery phase**

Part of the life cycle, during which an asset is designed, constructed and commissioned.

*NOTE 1: Delivery phase normally reflects a stage-based approach to a project.*

**Operational phase**

Part of the life cycle, during which an asset is used, operated and maintained.

**Plain Language Questions (PLQ)**

Questions formulated in simple, clear language, designed to avoid technical jargon or complex language.

**BIM Execution Plan (BEP)**

Plan that explains how the information management aspects of the appointment will be carried out by the delivery team.

*NOTE 1: The pre-appointment BIM execution plan focuses on the delivery team’s proposed approach to information management and their capability and capacity to manage information.*

**Key decision point**

Point in time during the life cycle when a decision crucial to the direction or viability of the asset is made.

*NOTE 1: During a project these generally align with project stages.*

**Information requirement**

Specification of what, when, how and for whom the information is to be produced.

**Project Information Requirements (PIR)**

Information requirements related to the development of an asset.

**Organizational Information Requirements (OIR)**

Information requirements related to organisational objectives.

**Exchange Information Requirements (EIR)**

Information Requirements related to a appointment.

**Information Exchange**

Act of satisfying an information requirement or part thereof.

# 1. Introduction

This document is an example of an EIR (Exchange Information Requirements of the Appointing Party) for the design phase of a multi-family building in Lisbon, complying with EN ISO 19650-2:2018. This is a concrete example applied to a fictitious situation and is intended as an illustration of good practice in BIM contracting during the design phase. Inherent in its nature, this is a document that will undergo various improvements over time. The web version is available at [https://github.com/buildingSMART-Portugal/EIR](https://github.com/buildingSMART-Portugal/EIR) (updated permanently) and the PDF version (updated periodically).

# 2. Information Requirements

## 2.1. Organisational Information Requirements (OIR)

The OIR is in line with the company's ESG (Environmental Social and Governance) policies.
The following aspects stand out:
* Developing properties that have the least impact on the environment and on the safety and health of the surrounding community and future property users.
* Construction of properties that comply with national regulations and incorporate sustainable solutions, including sustainability certification.
* Investment decisions supported by cost analyses and preliminary impact studies.
Choosing solutions that optimise operating and maintenance costs.

## 2.2. Project Information Requirements (PIR)

### 2.2.1. Appointing Party

`buildingSMART Portugal`

### 2.2.2. Commercial name of the project

`Open BIM Gardens`

### 2.2.3. Project scope

Building for mixed use (multi-family housing and commerce) with 5 floors above ground and 2 floors below ground. Purpose of marketing and sale of all fractions.

### 2.2.4. Purposes for which the information will be used by the Appointing Party

* **PIR01**: `Regulatory compliance`:
  * Development of all the necessary elements for permiting the development with the municipal authorities. All the written and drawn documents for the permiting procedure.
* **PIR02**: `Sustainability`:
  * Development of a specific sustainability study for BREEAM ‘Very Good’ certification.
* **PIR03**: `Business support`:
  * Budget estimate and project feasibility study.
* **PIR04**: `Construction support`:
  * Development of all the necessary elements to support the construction tender process.
* **PIR05**: `Safety and Health`:
  * Development of Safety and Health documentation.

### 2.2.5. Phases

* **Phase 01**: `Preliminary Design` -  01 Mar 2024 - 31 May 2024.
* **Phase 02**: `Developed Design` - 01 Jun 2024 - 31 Aug 2024.
* **Phase 03**: `Technical Design` - 4 months after permiting approval.

### 2.2.6. Hiring process

Direct award after initial consultation by invitation.

### 2.2.7. Key decision points

When defining information delivery milestones and key decision points, the time needed to review and accept the information is taken into account.

The points to consider are identified below.

The key decision points are scheduled for 10 working days after the exchanges of information with the Appointing Party and are distributed throughout the phases.

![Key decision points](/Images/KeyDecisionPoints.jpeg "Key decision points")

### 2.2.8. Decisions that will be taken at each key decision point.

* **Key decision point 1**
  * Decision to award a contract

* **Key decision point 2**
  * Decision on the level of BREEAM certification that is really desired, taking into account performance objectives and budgetary limits.
  * Decision on investment continuity and possible adaptations to strategic objectives.

* **Key decision point 3**
  * Decision on approval of end of phase with possible changes

### 2.2.9. Questions that need to be answered for informed decision-making. (PLQ)

* **Key decision point 1**
  * Is the fee proposal considered adequate?
  * Does the company/consortium of companies have a portfolio, team and capacity for the work?
  * In the BIM field, does it adequately fulfil the assessment using the matrix (‘Formulário de apoio à avaliação de candidatos’) of the CT197 ‘Guia de Contratação’?

* **Key decision point 2**
  * Are the requirements of the construction budget and the project met?
  * Are the architectural and technical solutions appropriate and do they satisfy preferences?
  * Does the BREEAM certification fulfil the criteria in a financially reasonable way?
* **Key decision point 3**
  * Are the requirements of the construction budget and the project met?
  * Are the architectural and technical solutions appropriate and do they satisfy preferences?
  * In the Developed Design: are the conditions guaranteed for the feasibility of town planning permission?
  * In the Technical Design: has the necessary information been gathered to proceed to tendering and construction?

## 2.3. Table of requirements

<table>
    <thead>
        <tr>
            <th>PIR Ref.</th>
            <th>Information purpose</th>
            <th>EIR Ref.</th>
            <th>Exchange Information Requirement (EIR)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=8>PIR01</td>
            <td rowspan=8>Regulatory compliance</td>
            <td>EIR01</td>
            <td>Survey of regulatory constraints (local and national).</td>
        </tr>
        <tr>
            <td>EIR02</td>
            <td>Survey of the site and its surroundings (including the topographical component and existing buildings).</td>
        </tr>
        <tr>
            <td>EIR03</td>
            <td>Geological-geotechnical study of the building site.</td>
        </tr>
        <tr>
            <td>EIR04</td>
            <td>Modelling of Architecture, Structural Design, Water Supply Networks, Wastewater and Rainwater Drainage Networks, HVAC, gas, fire, electrical*, telecommunications* and other disciplines required for the design in question, with the appropriate geo-referencing. Provision of a federation of models by the Lead Appointed Party.<br><sm>* the models in question will be represented in simplified form according to the level of information need.</sm></td>
        </tr>
        <tr>
            <td>EIR05</td>
            <td>Model coordination resulting from the combined analysis of architecture and disciplines. Support coordination in the collision matrix for which the Lead Appointed Party is responsible.</td>
        </tr>
        <tr>
            <td>EIR06</td>
            <td>Monitoring and validation of the BIM coordination process. Evidence of this process should be provided by the Lead Appointed Party's information manager. This evidence should demonstrate that the project is being developed in accordance with regulations and with the agreement of the Appointing Party, and that existing conflicts in the models are resolved.</td>
        </tr>
        <tr>
            <td>EIR07</td>
            <td>Production of drawings (obtained from the models, with potential exclusions duly justified in the BEP) and technical documentation from architectural and other disciplines designs.</td>
        </tr>
        <tr>
            <td>EIR08</td>
            <td>Energy simulations and certification.</td>
        </tr>
        <tr>
            <td>PIR02</td>
            <td>Sustainability</td>
            <td>EIR09</td>
            <td>BREEAM sustainability analysis with a ‘Very Good’ rating. The analysis does not need to be entirely based on models.</td>
        </tr>
        <tr>
            <td>PIR03</td>
            <td>Business support</td>
            <td>EIR10</td>
            <td>Estimate of quantities and costs (with quantities obtained from the models, with potential exclusions duly justified in the BEP) and timetable.</td>
        </tr>
        <tr>
            <td rowspan=2>PIR04</td>
            <td rowspan=2>Construction support</td>
            <td>EIR11</td>
            <td>Federation of duly coordinated and georeferenced models, drawings and technical documentation.</td>
        </tr>
        <tr>
            <td>EIR12</td>
            <td>Preparation of work and quantity maps (with quantities obtained from the models, with potential exclusions duly justified in the BEP).</td>
        </tr>
        <tr>
            <td>PIR05</td>
            <td>Safety and Health</td>
            <td>EIR13</td>
            <td>Preparation of the Safety and Health Plan and Technical Compilation of the Worksite.</td>
        </tr>
    </tbody>
</table>


## 2.4. Level of Information Need

The development of the tables with the Level of Information Need (EN ISO 7817-1:2024) to be followed in the various exchanges of information between the different actors is the responsibility of the Lead Appointed Party. The tables must be contained in the BEP, and this document presents reference tables with minimum requirements. Apoted Parties must add alphanumeric information that has not been provided for in the aforementioned tables and that is relevant to characterising the project objects. The IFC model must also contain information that makes it possible to relate the object to the bill of quantities.

Level of Information Need tables:
* [General](https://docs.google.com/spreadsheets/d/1k83QjVxPOW7c3up-CIHF8iAWr-czL6S-ydMOzpceqFA/edit?usp=sharing)
* [Architecture](https://docs.google.com/spreadsheets/d/11xiTGFg2GAbOHxz0F6xhg2sQ_z4YqAgn-09Cu-fTRag/edit?usp=sharing)
* [Structures](https://docs.google.com/spreadsheets/d/1dVo7M5WjIwx5io5K3Yz9jG1zup9KUn7F5YuW2Y4C7rw/edit?usp=sharing)
* [MEP](https://docs.google.com/spreadsheets/d/1pByYte0SPJFTEmYlWVsC-1OlroNQO20FR2xvnn8u4E0/edit?usp=sharing)


# 3. Acceptance criteria

Acceptance criteria are used to verify that the information is delivered properly. According to clause 5.2.1 c) of EN ISO 19650-2, there are four resources that provide rules for how information requirements are defined, delivered and verified for the entire project, namely: (a) project information standards; (b) project information production methods and procedures; (c) reference information; and (d) shared resources.

## 3.1. Project information standards

Project information standards aim to describe the criteria that will provide support and consistency for the information that will be developed throughout the project. According to clause 5.1.4 of EN ISO 19650-2, their definition must take into account how information will be exchanged, the structure and classification of the information, the method used to specify the Level of Information Need and the use of the information in post-construction phases and for operating the asset.

### 3.1.1. Standards

`EN ISO 19650 standard series and EN ISO 7817-1:2024 standard`

### 3.1.2. Nomenclature of information containers - Files

Information containers must be named using eight fields, separated by a delimiter, according to the following convention:

[`<Project>`](#a-project)-[`<Originator>`](#b-originator)-[`<Volume/System>`](#c-volumesystem)-[`<Level/Location>`](#d-levellocation)-[`<Type>`](#e-type)-[`<Discipline>`](#f-discipline)-[`<Phase>`](#g-phase)-[`<Number>`](#h-number)

#### a) Project

Unique code representing the project.

> Code:\
> `OBG`

---

#### b) Originator

Variable according to the organisation that created the information container. 

The codes must be defined by each Appointed Party and refer to the name of the company. The Appointing Party will approve the proposed codes.

The code must be defined in the BIM Execution Plan and contain three characters.

> The code for the building owner is `BSP`.

---

#### c) Volume/System

Variable, refers to subdivisions related to the function, and can be broken down into volumes and systems. 

The definition of these codes is the responsibility of each Appointed Party and can be up to four characters long.

The codes defined must be listed alongside their definitions in the BIM Execution Plan.

> Codes:
> * `XX - Not applicable`
> * `ZZ - All`

---

#### d) Level/Location

Variable, refers to the floors of the project or other types of spatial break-down.

The list below can be expanded by the Lead Appointed Party if deemed necessary. 

Newly defined codes must be listed alongside their definitions in the BIM Execution Plan.

> Codes:
> * `XXX - Not applicable`
> * `ZZZ - Various floors`
> * `S02 - Underground 02`
> * `S01 - Underground 01`
> * `P00 - Ground floor`
> * `P01 - Floor 01`
> * `P02 - Floor 02`
> * `P03 - Floor 03`
> * `P04 - Floor 04`
> * `C05 - Roof`

---

#### e) Type

Variable, refers to the form in which the information is presented. Each information container must contain a single type of information.

The list can be expanded by the Lead Appointed Party if deemed necessary. 

Newly defined codes must be listed alongside their definitions in the BIM Execution Plan.

> Codes:\
> The proposed codes are listed in [table A.1](#table-a1--type-field-codes) of Appendix A of this document.

---

#### f) Discipline

Variable according to the discipline to which the information container relates.

> Codes:\
> The proposed codes are listed in [table A.2](#table-a2--discipline-field-codes) of Appendix A of this document.

---

#### g) Phase

Variable according to the phase to which the information container relates.

> Codes:\
> The proposed codes are listed in [table A.3](#table-a3--phase-field-codes) of Appendix A of this document.

---

#### h) Number

Variable and ordered, applicable to the information containers that are part of a series of containers and for which there is no distinction in any of the other fields.

Codes must contain a maximum of four digits made up of whole numbers.

> Codes:
> * `0001 - First information comtainer`
> * `0002 - Second information comtainer`
> * `nnnn - Increasing numbering`

---

#### i) Example:

A PDF file developed by the Appointed Party ‘Gabinete de Projetos de Portugal’ (GPP), responsible for the structural design, containing the first 2D drawing of the building's footings design, for which the definition of floors does not apply.

> OBG-GPP-EST-DS-FUN-XXX-PP-0001.pdf

---

### 3.1.3. Metadata of information containers - Files

Metadata are additional attributes to the information containers that make it easier to locate, use and manage.

Information containers must contain metadata, separated by a delimiter, according to the following convention:

[`<Status>`](#a-status)-[`<Revision>`](#b-revision)-[`<Classification>`](#c-classification)-[`<Description>`](#d-description)-[`<Date>`](#e-date)-[`<Others>`](#f-others)

#### a) Status

The definition of the status is presented in relation to the CDE. The respective codes are listed in [table B.1](#table-b1--status-codes-for-the-information-containers-within-the-cde) of Appendix B of this document.

---

#### b) Revision

The revision code must be composed of three fields according to the following definition:
`<Field1>`.`<Field2>`.`<Field3>`

* `Field1` - Single letter indicating whether the revision is Preliminary (P) or Contractual (C)
* `Field2` - Two numeric characters indicating the primary revision number.
* `Field3` - Two numeric characters indicating the version of the primary revision, exclusively used for ‘Work in Progress’.

---

#### c) Classification

Classification according to the `PM Table` (Project Management) of the `SECClasS` system. Other classification system tables may be used if they are considered more appropriate, provided that this is agreed with the Appointing Party.

---

#### d) Description

Brief description of the content of the information container.

---

#### e) Date

Date of the last edition of the information container.

---

#### f) Others

The information containers may include additional metadata if they are deemed necessary by the Lead Appointed Party. Newly defined codes must be listed alongside their definitions in the BIM Execution Plan. 

---

### 3.1.4. Nomenclature of information blocks - IFC: Objects and alphanumeric information

It is not prescribed. However, it is recommended to use the nomenclatures in the proposed technical specification for ‘Regras de modelação de objetos’ available at: [https://bit.ly/secclass_manual_objetos_bim_](https://bit.ly/secclass_manual_objetos_bim_). The Lead Appointed Party must explain the principles adopted for naming in the BEP.

---

### 3.1.5. Units system

`International System of Units` in coherence with Directive 80/181/EEC and its addenda. EN ISO 80000-1:2022. The monetary unit is `€`.

---

### 3.1.6. Coordinate system

The coordinate system `PT-TM06/ETRS89` (EPSG: 3763) will be used, following DGT specifications.

[https://www.dgterritorio.gov.pt/geodesia/sistemas-referencia/portugal-continental/PT-TM06-ETRS89](https://www.dgterritorio.gov.pt/geodesia/sistemas-referencia/portugal-continental/PT-TM06-ETRS89)

---

### 3.1.7. Information classification

Classification system `SECClasS` in the version in force on the date of issue of this document.

[https://secclass.pt/pesquisa/](https://secclass.pt/pesquisa/)

---

### 3.1.8. Format and size of information containers

Editable documents and spreadsheets following the ISO/IEC 29500-1:2016 standard (XLSX and DOCX formats are valid, for example).

Point cloud survey files in ASTM E57.

Drawings in editable DWG format. 

Documents, spreadsheets and non-editable drawings in PDF format following the ISO 32000-2:2020 standard.

Models in the proprietary format of the platform used, to be delivered at the end of each phase.

Models in IFC 4.0.2.1 (IFC4 ADD2 TC1) ISO 16739-1:2018. Maximum 300 MB per independent information block.

Images in JPG or PNG format (1080p or 4K resolution).

Videos in MP4 format (1080p or 4K resolution).

Exchanges of information request in models in BCF.

---

### 3.1.9. Software - Appointed Parties

There are no requirements for the software to be used by the Appointed Parties. The software to be used will be validated at the BEP approval stage.

---

### 3.1.10. Platforms and software of the Appointing Party

The Appointing Party will use the software `<IFCVualisation/VerificationSoftwareName>` to visualise, verify and validate information containers IFC. The Lead Appointed Party must verify the proper performance of the information containers IFC on this platform and inform beforehand of potential problems in the interpretation of the IFCs submitted.

The CDE to be used will be maintained on the Appointing Party's servers and will consist of the `R2U`* CDE solution. 

All BCFs will be managed centrally in the `R2U` CDE.

\* CDE `R2U` is free and open software developed by the University of Minho.

### 3.1.11. Information for the asset management operational phase

No specific requirements in the design phase beyond the classification already required. This information will be required at the contract consultation stage. 

## 3.2. Methods and procedures for producing project information

Project information production methods and procedures define the approaches and techniques that the Appointing Party uses to create, manage and approve information.

### 3.2.1 Capturing information from existing assets

As there has been no previous construction on the site and the updated topographical survey is available in the Reference Information (and complies with Lisbon City Council requirements), no information capture of this type is expected to be necessary.

There is a need to survey the surroundings using methods that provide sufficient information for the permiting process and for analysing shading and occlusions.

The Appointed Parties will be responsible for defining the requirements to be met in order to prepare the geological-geotechnical report needed for the structural design. The Appointing Party will independently award and contract the work related to the preparation of the geological-geotechnical report.

---

### 3.2.2. Creation, revision and approval of new information

#### a) Information creation:

The production of native models and associated data must allow the creation of models in IFC. Proxy objects should not be used when there is a specific object class for this purpose in SCHEMA IFC.

The delivery team must define an origin for the project's local coordinate reference that is common to all models.

The local reference point may be rotated in relation to the North of the coordinate system, and this rotation must be established in the BIM Execution Plan with the corresponding justification.

The origin of the project's local coordinate reference point must be identified with a geometric element labelled ‘OriginOfProject’: an inverted square pyramid with a base of 0.5m and a height of 1m, with the bottom vertex coinciding with the origin.

In addition, there may also be a second point (labelled ‘Landmark’) with the same characteristics and local coordinates (1,1,0).

All models, of all disciplines, must follow a common set of building story elevations and nomenclature. 

Space objects must contain consistent information on the type, function and numbering of the room.

All object instances must be assigned to the correct building story of the building according to the building story on which they are located.

Object instances with different properties, e.g. external/internal, structural/non-structural properties, should be split into different instances. For example, a wall that runs from the inside to the outside should be divided into the building envelope.

The classification system defined in this document must be used to produce the work and quantity maps, although it is possible for the Lead Appointed Party to propose an additional granularity of the classification system in its BEP.

The models delivered in IFC must not contain duplication of elements between different specialities. Exceptional situations must be duly categorised and justified in the BEP.

The structure of the IFC models should be uniform across all disciplines, with the nomenclature complying with the following table:

| IFC entity               | Nomenclature    |
| ------------------------ | --------------- |
| IfcProject               | OpenBIMGarden   |
| -- IfcSite               | Arroios         |
| ---- IfcBuilding         | OpenBIMGarden01 |
| ------ IfcBuildingStorey | S02             |
| ------ IfcBuildingStorey | S01             |
| ------ IfcBuildingStorey | P00             |
| ------ IfcBuildingStorey | P01             |
| ------ IfcBuildingStorey | P02             |
| ------ IfcBuildingStorey | P02             |
| ------ IfcBuildingStorey | P03             |
| ------ IfcBuildingStorey | P04             |
| ------ IfcBuildingStorey | C05             |

Some changes may be made at the design stage, to be proposed by the Lead Appointed Party.

The post-contract BEP must indicate the elevation of each IfcBuildingStorey, as well as its elevation in relation to the 0.00 of the project. All disciplines must follow these same elevations.

Auxiliary work building stories are allowed in native models, but they cannot be exported to models in IFC format.

IFC models must always have the objects allocated to the corresponding IfcBuildingStorey.

In the case of editable drawings, they must be in DWG format when generated in CAD. In the case of drawings generated using BIM platforms, this requirement only applies at the end of each phase, as a deliverable. There is no requirement for the DWGs to be formatted in the same way as the PDFs of the drawings, as they are merely working documents.

---

#### b) Coordination:

Model coordination should be carried out regularly. Each Appointed Party should coordinate its own models as part of its quality assurance process, before sharing the information with the delivery team. Information/clarification exchanges regarding BIM models between the Appointing Party and the Lead Appointed Party should preferably be carried out using BCF files in the CDE.

Any exchange of information between task teams of the same discipline must take place within their respective folder in the *Work in Progress* status of the Common Data Environment. The organisation and frequency of these exchanges is determined by the Lead Appointed Party for their delivery team.

The information produced by each Appointed Party should only be shared with other Appointed Parties when already coordinated within each delivery team. Information exchanges between different Appointed Parties take place in the *Shared* state of t
he Common Data Environment. A maximum periodicity of 15 days is defined for updating models in the CDE, with at least S2 status.

---

#### c) Review and approval of information:

Each task team must carry out a quality assurance check on each information container before reviewing the information it contains.

The information review and approval process follows the flow illustrated in the figure below:

![Review and approval of information process](/Images/RevisionApprovalInformation.jpeg "Processo de revisão e aprovação da informação")


The items to be considered in the review, as well as the KPIs and checklist, are detailed below. [Acceptance table](#33-acceptance-table).

### 3.2.3. Delivery of information to the Appointing Party

The final deliverables will be realised using the CDE solution determined previously.

The final deliverables must move to status S5 ([table B.1](#table-b1--codes-for-the-status-of-the-information-blocks-within-the-cde)) when they are finalised within the dates determined in section 5.

---

### 3.2.4. Security

The collaborative digital working methods and technologies used in the project involve the collaborative sharing of information by a number of independent actors, and therefore the need arose to manage the vulnerability issues inherent in the availability of information in accordance with the requirements of EN ISO 19650-5. The Appointing Party therefore carried out a sensitivity assessment to identify whether or not a security approach was required and applied the triage process, which led to the ST4 classification. 

This classification led to the conclusion that in this project there will be no need to develop a security strategy, respective security plan, fault and incident management plans and information sharing agreements with Appointed Parties. However, commercial and personal information must be protected in accordance with the legislation in force, namely the GDPR. Appropriate measures must also be taken to minimise threats arising from fraudulent and other criminal activities and cybersecurity incidents.

## 3.3. Acceptance table

| Acceptance criteria*    | Note | Description                                                                                                                                                         |
| ----------------------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Not Applicable          | NA   | Requirement not applicable at a given stage or for a given project                                                                                                  |
| Not compliant           | 0    | Does not fulfil BEP criteria; In some cases, such as Levels, Grids and Orientation/Coordinate System, there are no intermediate gradations: only 0 or 3 is applied. |
| Partially compliant     | 1    | Most of the information blocks do not comply with the BEP; Classification is not sufficient for approval                                                            |
| Substantially compliant | 2    | Most of the information containers comply with the BEP; Classification is sufficient for conditional approval                                                       |
| Fully compliant         | 3    | All information containers are in accordance with the BEP                                                                                                           |

\* Minimum score for acceptance is 2; this score can be weighted according to the context, project phase or discipline and be justified in the comments.

### 3.3.1. Overall assessment

| Ref. | EIR   | Title                                                                | Description                                                                                                                                                                                                                      |
| ---- | ----- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A    | EIR01 | Survey of regulatory constraints                                     | Delivery of a summary of the identified constraints.<br>Information provided in accordance with the project's standards and information production methods and procedures.                                                       |
| B    | EIR02 | Survey of the site and its surroundings                              | Delivery of the point cloud.<br>Information provided in accordance with the project's standards and information production methods and procedures.                                                                               |
| C    | EIR03 | Geological-geotechnical study                                        | Delivery of the geological-geotechnical report.<br>Information provided in accordance with the project's standards and information production methods and procedures.                                                            |
| D    | EIR04 | Modelling                                                            | Delivery of models in the formats defined in the information standards.<br>Information provided in accordance with the project's standards and information production methods and procedures.                                    |
| E    | EIR05 | Model coordination                                                   | Report of no clashes (or clashes with due justification).<br>Information provided in accordance with the project's standards and information production methods and procedures.                                                  |
| F    | EIR06 | BIM coordination                                                     | Regular attendance at BIM coordination meetings and coordinated design with other disciplines; Clashes identified, reported and resolved in accordance with the process described in EIR 06; Model federated on a regular basis. |
| G    | EIR07 | Production of drawings                                               | Delivery of drawings extracted from the models.<br>Information provided in accordance with the project's standards and information production methods and procedures.                                                            |
| H    | EIR08 | Energy simulations and certification                                 | Delivery of the energy report and certificate.<br>Information provided in accordance with the project's standards and information production methods and procedures.                                                             |
| I    | EIR09 | BREEAM sustainability analysis                                       | Delivery of the analysis report, guaranteeing the final ‘Very Good’ classification.<br>Information provided in accordance with the project's standards and information production methods and procedures.                        |
| J    | EIR10 | Estimate of quantities and costs                                     | Delivery of the quantity take-off extracted from the models.<br>Information provided in accordance with the project's standards and information production methods and procedures.                                               |
| L    | EIR11 | Mode federation                                                      | Delivery of all models and respective drawings and technical reports.<br>Information provided in accordance with the standards and methods and procedures for producing project information.                                     |
| M    | EIR12 | Preparation of work and quantity maps                                | Measurements extracted from models / confirm that measurements match MQT.<br>Information provided in accordance with the project's standards and information production methods and procedures.                                  |
| N    | EIR13 | Preparation of the Safety and Health Plan and Health and Safety File | Delivery of the Safety and Health Plan and prepare the Health and Safety File.<br>Information provided in accordance with the project's standards and information production methods and procedures.                             |

### 3.3.2. Model Quality

#### a) Geometry

| Ref. | Title                                      | Description                                                                                             |
| ---- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| A    | General assessment                         | Model                                                                                                   |
| B    | Origin / Coordinate System                 | Georeferenced coordinates and inverted prism in the file                                                |
| C    | Orientation                                | Oriented to the north                                                                                   |
| D    | Structural Axes                            | Structural axes coordinated with the base file (IfcGrid)                                                |
| E    | Building floors                            | Coordinated levels with base file (IfcBuidlingStorey)                                                   |
| F    | Duplicates                                 | No duplicates                                                                                           |
| G    | Minimum geometric information requirements | Detail, Dimension, Location, Appearance and Parametric Behaviour according to Level of Information Need |

#### b) Non-graphical information

| Ref. | Title                                          | Description                                                                                          |
| ---- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| H    | Spaces / Areas                                 | Each space identified as IfcSpace                                                                    |
| I    | Nomenclature of information containers - Files | Files fulfil nomenclature                                                                            |
| J    | Information containers delivered to the CDE    | All files have been placed in the CDE; includes Ifc and native files                                 |
| K    | Units.                                         | Unit system as defined in the BEP                                                                    |
| L    | Attributes (Ifc)                               | Objects mapped to the right IFC Class and Type (avoid objects classified as IfcBuildingElementProxy) |
| M    | Properties (Ifc)                               | Model fulfils information requirements of the Level of Information Need                              |
| N    | Materials                                      | Materials fulfil Level of Information Need requirements                                              |
| O    | Classification                                 | Objects classified according to the SECClasS system                                                  |


# 4. Support information

Supporting information consists of information that is intended to be made available by the Appointing Party to the Lead Appointed Party in order to avoid redundant work and ensure that the information is developed in accordance with its standards. This enables the Lead Appointed Party to have a better understanding of what is required for the project. According to clause 5.2.1 d) of EN ISO 19650-2, supporting information can consist of existing asset information, shared resources, examples of deliverables, supporting documents, guidance material and references to international, national or industry standards.

Support information is available at: [https://drive.google.com/drive/folders/1JB1Rz85srkqedVM_9hqo3ANSmihxsILz?usp=sharing
](https://drive.google.com/drive/folders/1JB1Rz85srkqedVM_9hqo3ANSmihxsILz?usp=sharing)

## 4.1. Reference information

| Nomenclature                      | State | Revision | Classification | Date       | Description                                 |
| --------------------------------- | ----- | -------- | -------------- | ---------- | ------------------------------------------- |
| OBG-BSP-ZZ-ZZZ-CE-XXX-XX-0001.pdf | A1    | C01      | PM_40_50       | 11.01.2024 | Application                                 |
| OBG-BSP-ZZ-ZZZ-CE-XXX-XX-0002.pdf | A1    | C01      | PM_40_50_49    | 11.01.2024 | Power of attorney                           |
| OBG-BSP-ZZ-ZZZ-CE-XXX-XX-0003.pdf | A1    | C01      | PM_10_20_03    | 11.01.2024 | Term, insurance, OA declaration, topography |
| OBG-BSP-ZZ-ZZZ-LG-XXX-XX-0001.pdf | A1    | C01      | PM_30_10_80    | 11.01.2024 | Urban Land Registry                         |
| OBG-BSP-ZZ-ZZZ-LG-XXX-XX-0002.pdf | A1    | C01      | PM_55          | 11.01.2024 | CRC                                         |
| OBG-BSP-ZZ-ZZZ-LG-XXX-XX-0003.pdf | A1    | C01      | PM_30_10_47    | 11.01.2024 | CRP                                         |
| OBG-BSP-ZZ-ZZZ-LV-LEV-XX-0001.dwf | A1    | C01      | PM_30_20_89    | 11.01.2024 | Topographic survey                          |

## 4.2. Shared resources

| Nomenclature                                                                  | State | Revision | Classification | Date       | Description          |
| ----------------------------------------------------------------------------- | ----- | -------- | -------------- | ---------- | -------------------- |
| OBG-BSP-ZZ-ZZZ-RL-XXX-XX-0001.docx                                            | A1    | C01      | FI_90_88       | 11.01.2024 | Reports template     |
| OBG-BSP-ZZ-ZZZ-RL-XXX-XX-0002.dwg                                             | A1    | C01      | FI_90_88       | 11.01.2024 | Cover sheet template |
| [OBG-BSP-ZZ-ZZZ-EP-XXX-XX-0001.ids](IDS-EN/OBG-BSP-ZZ-ZZZ-EP-XXX-XX-0001.ids) | A1    | C01      | PM_40_30       | 28.11.2024 | IDS General          |
| [OBG-BSP-ZZ-ZZZ-EP-ARQ-XX-0001.ids](IDS-EN/OBG-BSP-ZZ-ZZZ-EP-ARQ-XX-0001.ids) | A1    | C01      | PM_40_30       | 28.11.2024 | IDS Architecture     |
| [OBG-BSP-ZZ-ZZZ-EP-EST-XX-0001.ids](IDS-EN/OBG-BSP-ZZ-ZZZ-EP-EST-XX-0001.ids) | A1    | C01      | PM_40_30       | 28.11.2024 | IDS Structures       |
| [OBG-BSP-ZZ-ZZZ-EP-XXX-XX-0002.ids](IDS-EN/OBG-BSP-ZZ-ZZZ-EP-XXX-XX-0002.ids) | A1    | C01      | PM_40_30       | 28.11.2024 | IDS MEP              |

# 5. Dates, information delivery milestones and key decision points

At the tender stage, bidders must submit:
* The `pre-contract BEP` accordin to the EN ISO 19650 and national specification, including RACI matrix and demonstration of capability.
* The `matriz de apoio à pontuação dos Candidatos` ('Formulário de apoio à avaliação de candidatos') from the CT197 'Guia de Contratação'.
* The `Proposal fee`.

<table>
    <thead>
        <tr>
            <th>EIR</th>
            <th>Delivery date of the deliverable</th>
            <th>Key decision point</th>
            <th>Delivery date of the result of the key decision point</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th colspan=4 style="text-align: left;">Preliminary Design</th>
        </tr>
        <tr>
            <td>EIR01<br>EIR02<br>EIR03<br>EIR04<br>EIR09<br>EIR10</td>
            <td>02/04/2024<br>(10 days before the decision is made)</td>
            <td>Decision point 2:<ul><li>Decision on the level of BREEAM certification that is really desired, taking into account performance objectives and budgetary limits.</li><li>Decision on continuity of investment and possible adaptations to strategic objectives.</li></ul></td>
            <td>12/04/2024<br>(7 weeks before the end of the phase)</td>
        </tr>
        <tr>
            <td>EIR04<br>EIR08<br>EIR09<br>EIR10</td>
            <td>21/08/2024<br>(10 days before the decision is made)</td>
            <td>Decision point 3:<ul><li>Decision on final approval of phase with possible amendments.</li></ul></td>
            <td>31/08/2024<br>(end of the phase)</td>
        </tr>
        <tr>
            <td>EIR05</td>
            <td colspan=3>Coordination of the models takes place before the coordination meetings, and the results of the coordination must be communicated at least 2 working days before the coordination meetings.</td>
        </tr>
        <tr>
            <td>EIR06</td>
            <td colspan=3>Coordination meetings held fortnightly (start date to be determined).</td>
        </tr>
        <tr>
            <th colspan=4 style="text-align: left;">Developed Design</th>
        </tr>
        <tr>
            <td>EIR04<br>EIR07<br>EIR08<br>EIR09<br>EIR10</td>
            <td>22/03/2024<br>(10 days before the decision is made)</td>
            <td>Decision point 3:<ul><li>Decision on final approval of phase with possible amendments.</li></ul></td>
            <td>01/04/2024<br>(end of the phase)</td>
        </tr>
        <tr>
            <td>EIR05</td>
            <td colspan=3>Coordination of the models takes place before the coordination meetings, and the results of the coordination must be communicated at least 2 working days before the coordination meetings.</td>
        </tr>
        <tr>
            <td>EIR06</td>
            <td colspan=3>Coordination meetings held fortnightly (start date to be determined).</td>
        </tr>
        <tr>
            <th colspan=4 style="text-align: left;">Technical Design</th>
        </tr>
        <tr>
            <td>EIR04<br>EIR07<br>EIR10<br>EIR11<br>EIR12<br>EIR13</td>
            <td>10 days before the decision is made</td>
            <td>Decision point 3:<ul><li>Decision on final approval of phase with possible amendments.</li></ul></td>
            <td>In the end of the phase.</td>
        </tr>
        <tr>
            <td>EIR05</td>
            <td colspan=3>Coordination of the models takes place before the coordination meetings, and the results of the coordination must be communicated at least 2 working days before the coordination meetings.</td>
        </tr>
        <tr>
            <td>EIR06</td>
            <td colspan=3>Coordination meetings held fortnightly (start date to be determined).</td>
        </tr>
    </tbody>
</table>

# Appendixes

## Appendix A - Codes for naming information containers

### Table A.1 – Type field codes

<table>
    <thead>
        <tr>
            <th>Type (portuguese)</th>
            <th>Type (english)</th>
            <th>Description (portuguese)</th>
            <th>Description (english)</th>
            <th>Code</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td rowspan=6>Comunicação</td>
            <td rowspan=6>Communication</td>
            <td>Agenda</td>
            <td>Agenda</td>
            <td>AG</td>
        </tr>
        <tr>
            <td>Correspondência</td>
            <td>Correspondence</td>
            <td>CO</td>
        </tr>
        <tr>
            <td>Ficheiro de notas</td>
            <td>Notes file</td>
            <td>FN</td>
        </tr>
        <tr>
            <td>Ata</td>
            <td>Minutes</td>
            <td>AT</td>
        </tr>
        <tr>
            <td>Apresentação</td>
            <td>Presentation</td>
            <td>AP</td>
        </tr>
        <tr>
            <td>Pedido</td>
            <td>Pedido</td>
            <td>PI</td>
        </tr>
        <tr>
            <td rowspan=1>Dados</td>
            <td rowspan=1>Data</td>
            <td>Base de dados</td>
            <td>Database</td>
            <td>BD</td>
        </tr>
        <tr>
            <td rowspan=2>Projeto</td>
            <td rowspan=2>Project</td>
            <td>Cálculos</td>
            <td>Calculations</td>
            <td>CA</td>
        </tr>
        <tr>
            <td>Especificação</td>
            <td>Specification</td>
            <td>EP</td>
        </tr>
        <tr>
            <td rowspan=3>Financeiro</td>
            <td rowspan=3>Finance</td>
            <td>Mapa de quantidades</td>
            <td>Quantities map</td>
            <td>MQ</td>
        </tr>
        <tr>
            <td>Estimativa orçamental</td>
            <td>Budget estimate</td>
            <td>EO</td>
        </tr>
        <tr>
            <td>Cotação</td>
            <td>Quotation</td>
            <td>CT</td>
        </tr>
        <tr>
            <td rowspan=8>Gráfico</td>
            <td rowspan=8>Graphics</td>
            <td>Ficheiro de animação</td>
            <td>Animation file</td>
            <td>FA</td>
        </tr>
        <tr>
            <td>Deteção de colisões</td>
            <td>Clash detection</td>
            <td>DC</td>
        </tr>
        <tr>
            <td>Modelo combinado</td>
            <td>Federated model</td>
            <td>MC</td>
        </tr>
        <tr>
            <td>Desenho</td>
            <td>Drawing</td>
            <td>DS</td>
        </tr>
        <tr>
            <td>Modelo - tridimensional</td>
            <td>Three-dimensional model</td>
            <td>M3</td>
        </tr>
        <tr>
            <td>Modelo - bidimensional</td>
            <td>Two-dimensional model</td>
            <td>M2</td>
        </tr>
        <tr>
            <td>Fotografia</td>
            <td>Photography</td>
            <td>FT</td>
        </tr>
        <tr>
            <td>Visualização</td>
            <td>Visualisation</td>
            <td>VS</td>
        </tr>
        <tr>
            <td rowspan=1>Orientação oficial</td>
            <td rowspan=1>Official guidelines</td>
            <td>Regulamento</td>
            <td>Regulation</td>
            <td>RG</td>
        </tr>
        <tr>
            <td rowspan=1>Planeamento de projeto</td>
            <td rowspan=1>Project planning</td>
            <td>Programa</td>
            <td>Programme</td>
            <td>PR</td>
        </tr>
        <tr>
            <td rowspan=7>Registo de informação</td>
            <td rowspan=7>Registering information</td>
            <td>Certificado</td>
            <td>Certificate</td>
            <td>CE</td>
        </tr>
        <tr>
            <td>Mapa de processos</td>
            <td>Process map</td>
            <td>MP</td>
        </tr>
        <tr>
            <td>Relatório</td>
            <td>Report</td>
            <td>RL</td>
        </tr>
        <tr>
            <td>Cronograma ou tabela</td>
            <td>Timetable or table</td>
            <td>CR</td>
        </tr>
        <tr>
            <td>Levantamento</td>
            <td>Survey</td>
            <td>LV</td>
        </tr>
        <tr>
            <td>Documento de legitimidade</td>
            <td>Legitimacy document</td>
            <td>LG</td>
        </tr>
    </tbody>
</table>

### Table A.2 – Discipline field codes

| Description (portuguese)                                | Description (english)                             | Code |
| ------------------------------------------------------- | ------------------------------------------------- | ---- |
| Acessibilidades                                         | Accessibility                                     | ACS  |
| Engenharia acústica                                     | Acoustic engineering                              | ACU  |
| Agricultura e desenvolvimento rural                     | Agriculture and rural development                 | ADR  |
| Engenharia do ambiente                                  | Environmental engineering                         | AMB  |
| Arquitetura paisagista                                  | Landscape architecture                            | APA  |
| Arquitetura                                             | Architecture                                      | ARQ  |
| Auditorias de segurança rodoviária                      | Road safety audits                                | ASR  |
| Barragens                                               | Dams                                              | BAR  |
| Cartografia                                             | Cartography                                       | CAR  |
| Canal técnico rodoviário                                | Technical road channel                            | CTR  |
| Demolições                                              | Demolitions                                       | DEM  |
| Escavação e/ou contenção periférica                     | Excavation and/or peripheral containment          | ECP  |
| Estudo de comportamento térmico                         | Thermal behaviour study                           | ECT  |
| Engenharia eletrotécnica - eletricidade                 | Electrical engineering - electricity              | EEL  |
| Engenharia eletrotécnica - ited                         | Electrical engineering - ited                     | EIT  |
| Engenharia eletromecânica                               | Electromechanical engineering                     | ELM  |
| Estudo do ruído                                         | Noise study                                       | ERU  |
| Engenharia de estruturas                                | Structural engineering                            | EST  |
| Estudo de tráfego                                       | Traffic study                                     | ETF  |
| Estruturas de suporte e taludes                         | Support structures and slopes                     | ETS  |
| Fluidos industriais                                     | Industrial fluids                                 | FLI  |
| Gás                                                     | Gas                                               | GAS  |
| Geologia                                                | Geology                                           | GEO  |
| Geotecnia                                               | Geotechnics                                       | GET  |
| Gestão técnica centralizada                             | Centralised technical management                  | GTC  |
| Engenharia hidráulica - abastecimento de água           | Hydraulic engineering - water supply              | HAB  |
| Engenharia hidráulica - drenagem de águas pluviais      | Hydraulic engineering - rainwater drainage        | HAP  |
| Engenharia hidráulica - drenagem de águas residuais     | Hydraulic engineering - wastewater drainage       | HAR  |
| Engenharia hidráulica - drenagem (pluviais e residuais) | Hydraulic engineering - drainage (rain and waste) | HDR  |
| Hidrogeologia                                           | Hydrogeology                                      | HGL  |
| Engenharia hidráulica                                   | Hydraulic engineering                             | HID  |
| Engenharia hidráulica - tratamento de água              | Hydraulic engineering - water treatment           | HTA  |
| Engenharia hidráulica - tratamento de águas residuais   | Hydraulic engineering - wastewater treatment      | HTR  |
| Infraestruturas aeroportuárias                          | Airport infrastructure                            | IAE  |
| Infraestruturas ferroviárias                            | Railway infrastructure                            | IFE  |
| Infraestruturas marítimas                               | Maritime infrastructure                           | IMA  |
| Instrumentação                                          | Instrumentation                                   | INS  |
| Infraestruturas rodoviárias                             | Road infrastructure                               | IRO  |
| Linha de transporte de energia                          | Energy transmission line                          | LTE  |
| Estudo luminotécnico                                    | Lighting study                                    | LUM  |
| Engenharia mecânica - avac                              | Mechanical engineering - HVAC                     | MAC  |
| Engenharia mecânica - climatização                      | Mechanical engineering - air conditioning         | MCL  |
| Engenharia mecânica - ventilação /exaustão              | Mechanical engineering - ventilation/exhaustion   | MVE  |
| Obras de arte                                           | Engineering structures                            | OAR  |
| Rede de ar comprimido                                   | Compressed air network                            | RAC  |
| Resíduos sólidos urbanos                                | Urban solid waste                                 | RSU  |
| Serviços afetados                                       | Services affected                                 | SAF  |
| Segurança contra incêndio                               | Fire safety                                       | SCI  |
| Segurança                                               | Safety                                            | SEG  |
| Sinalização e equipamento de segurança                  | Signalling and safety equipment                   | SIN  |
| Ocupação do solo                                        | Land use                                          | SOL  |
| Som e áudio                                             | Sound and audio                                   | SOM  |
| Obras subterrâneas                                      | Underground works                                 | SUB  |
| Terraplenagens                                          | Earthworks                                        | TER  |
| Topografia                                              | Topography                                        | TOP  |
| Traçado                                                 | Layout                                            | TRA  |
| Urbanismo                                               | Urban planning                                    | URB  |
| Não disciplinar / não aplicável                         | General (non‐disciplinary)                        | XXX  |
| Multidisciplinar                                        | Multidisciplinary                                 | ZZZ  |


### Table A.3 – Phase field codes

| Phase description (portuguese)                | Phase description (english)                | Code |
| --------------------------------------------- | ------------------------------------------ | ---- |
| Sem fase                                      | Without phase                              | XX   |
| Programa preliminar                           | Preparation and Brief                      | PP   |
| Programa base                                 | Concept Design                             | PB   |
| Estudo Prévio                                 | Preliminary Design                         | EP   |
| Anteprojeto                                   | Developed Design                           | AP   |
| Projeto de execução                           | Technical Design                           | PE   |
| Construção                                    | Construction                               | CO   |
| Entrega da obra (telas finais)                | Handover                                   | TF   |
| Utilização dos ativos (operação e manutenção) | In use (operation and maintenance)         | OM   |
| Fim de vida (descomissionamento / demolição)  | End of life (decommissioning / demolition) | DD   |

## Appendix B - Codes for information containers metadata

### Table B.1 – Status codes for the information containers within the CDE

<table>
    <thead>
        <tr>
            <th>Description</th>
            <th>Code</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th colspan=2 style="text-align: left;">Status: Work in Progress (WIP)</th>
        </tr>
        <tr>
            <td>Information container being developed by the task team.</td>
            <td>S0</td>
        </tr>
        <tr>
            <th colspan=2 style="text-align: left;">Status: Shared (non-contractual)</th>
        </tr>
        <tr>
            <td>Information container suitable for geometric and non-geometric coordination within the delivery team.</td>
            <td>S1</td>
        </tr>
        <tr>
            <td>Information container suitable as a reference information for other task teams within the delivery team.</td>
            <td>S2</td>
        </tr>
        <tr>
            <td>Information container suitable for revision and comment within the delivery team.</td>
            <td>S3</td>
        </tr>
        <tr>
            <td>Information container suitable for review and approval by the Lead Appointed Party.</td>
            <td>S4</td>
        </tr>
        <tr>
            <td>Information container suitable for review and acceptance by the Appointing Party.</td>
            <td>S5</td>
        </tr>
        <tr>
            <th colspan=2 style="text-align: left;">Status: Published (contractual)</th>
        </tr>
        <tr>
            <td>Information container authorized and accepted.</td>
            <td>A1, An, etc</td>
        </tr>
    </tbody>
</table>
