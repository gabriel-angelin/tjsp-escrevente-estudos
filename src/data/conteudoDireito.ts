import { TopicItem } from '../types';

export const topicsDireito: TopicItem[] = [
  // DIREITO CONSTITUCIONAL
  {
    id: 'const-art5',
    title: 'CF/88: Direitos e Deveres Individuais e Coletivos (Art. 5º)',
    subjectId: 'const',
    subjectName: 'Direito Constitucional',
    category: 'direito',
    bloc: 'Bloco II',
    importance: 'Altíssima',
    summary: 'O artigo mais cobrado pela VUNESP em Direito Constitucional. Abrange igualdade, liberdade, inviolabilidade de domicílio, sigilo de correspondência e os remédios constitucionais.',
    keyArticles: 'Artigo 5º, incisos I a LXXIX e §§ 1º a 4º da Constituição Federal de 1988.',
    fullContent: `
### Artigo 5º da CF/88 - Esquematizado para Concurso

Todos são iguais perante a lei, sem distinção de qualquer natureza, garantindo-se aos brasileiros e aos estrangeiros residentes no País a inviolabilidade do direito à vida, à liberdade, à igualdade, à segurança e à propriedade.

#### 1. Principais Incisos Cobrados pela VUNESP:
- **Inviolabilidade de Domicílio (Inciso XI)**: "A casa é asilo inviolável do indivíduo, ninguém nela podendo penetrar sem consentimento do morador, salvo:
  1. Em caso de **flagrante delito** (a qualquer hora);
  2. Em caso de **desastre** (a qualquer hora);
  3. Para prestar **socorro** (a qualquer hora);
  4. Durante o **dia**, por **determinação judicial** (atenção: determinação judicial é SOMENTE DE DIA!)."
- **Sigilo das Comunicações (Inciso XII)**: É inviolável o sigilo da correspondência e das comunicações telegráficas, de dados e das comunicações telefônicas, salvo, no último caso (telefônica), por **ordem judicial**, nas hipóteses e na forma que a lei estabelecer para fins de **investigação criminal ou instrução processual penal**. (Pegadinha: CPI não pode quebrar sigilo telefônico de conversa, apenas de dados telefônicos!).
- **Crimes Inafiançáveis e Imprescritíveis (Mnemônico RA-ÇÃO)**:
  - **RA**: Racismo (inafiançável e imprescritível, sujeito a reclusão).
  - **ÇÃO**: Ação de grupos armados, civis ou militares, contra a ordem constitucional e o Estado Democrático.
- **Crimes Inafiançáveis e Insuscetíveis de Graça ou Anistia (Mnemônico 3T + H)**:
  - **T**ráfico ilícito de entorpecentes;
  - **T**ortura;
  - **T**errorismo;
  - Crimes **H**ediondos. (São prescritíveis, mas não cabe fiança nem graça/anistia!).

#### 2. Remédios Constitucionais:
- **Habeas Corpus (HC)**: Protege a liberdade de locomoção (ir, vir e permanecer). É **gratuito** e não exige advogado.
- **Habeas Data (HD)**: Para assegurar o conhecimento ou retificação de informações relativas à pessoa do impetrante constantes de registros públicos. É **gratuito**.
- **Mandado de Segurança (MS)**: Protege direito líquido e certo, não amparado por HC ou HD. Prazo decadencial: 120 dias.
- **Mandado de Injunção (MI)**: Suprir a falta de norma regulamentadora que torne inviável o exercício dos direitos e liberdades constitucionais.
- **Ação Popular (AP)**: Qualquer **cidadão** (com título de eleitor) é parte legítima para anular ato lesivo ao patrimônio público, histórico, cultural ou ao meio ambiente. É **gratuita**, salvo comprovada má-fé.
    `,
    vunespTips: [
      'A Vunesp ama trocar "qualquer pessoa" por "qualquer cidadão" na Ação Popular.',
      'Lembre-se: mandado judicial para entrar na casa só pode ser cumprido durante o DIA.',
      'O Habeas Data exige prova de recusa da autoridade administrativa em fornecer os dados.'
    ],
    practiceQuestions: [
      {
        id: 'q-const-1',
        year: '2024',
        exam: 'TJ-SP Escrevente',
        statement: 'Nos termos da Constituição Federal, a casa é asilo inviolável do indivíduo, nela não podendo ninguém penetrar sem consentimento do morador, salvo por determinação judicial:',
        options: [
          'A qualquer hora do dia ou da noite, desde que acompanhado por testemunhas.',
          'Durante o dia ou à noite, em caso de fundada suspeita de contravenção penal.',
          'Durante a noite, desde que com autorização do Ministério Público.',
          'Durante o dia, apenas.',
          'A qualquer momento, se houver concordância do síndico do condomínio.'
        ],
        correctIndex: 3,
        explanation: 'Art. 5º, XI da CF: por determinação judicial, a entrada forçada só pode ocorrer durante o DIA.'
      }
    ]
  },
  {
    id: 'const-art37',
    title: 'CF/88: Administração Pública e Servidores (Arts. 37 a 41 + Art. 92)',
    subjectId: 'const',
    subjectName: 'Direito Constitucional',
    category: 'direito',
    bloc: 'Bloco II',
    importance: 'Altíssima',
    summary: 'Princípios da Administração Pública (LIMPE), regras de concurso, cargos em comissão, teto constitucional, acumulação remunerada e órgãos do Poder Judiciário.',
    keyArticles: 'Artigos 37, 38, 39, 40, 41 e 92 da CF/88.',
    fullContent: `
### Princípios Expressos da Administração Pública (Art. 37, caput):
- **L**egalidade: O administrador público só pode agir se houver lei autorizando.
- **I**mpessoalidade: A atuação visa ao interesse público, vedada a promoção pessoal de autoridades.
- **M**oralidade: Observância da ética, boa-fé e honestidade administrativa.
- **P**ublicidade: Transparência dos atos estatais como regra geral.
- **E**ficiência: Busca por rendimento funcional, presteza e qualidade do serviço.

#### Regras Fundamentais de Cargos e Concursos:
- **Concurso Público**: Validade de **até 2 anos**, prorrogável **uma única vez por igual período**.
- **Acumulação Remunerada de Cargos**: A regra geral é a **VEDAÇÃO**. Exceções (desde que haja compatibilidade de horários):
  a) Dois cargos de professor;
  b) Um cargo de professor com outro técnico ou científico;
  c) Dois cargos ou empregos privativos de profissionais de saúde, com profissões regulamentadas.
- **Estabilidade do Servidor (Art. 41)**: São estáveis após **3 anos** de efetivo exercício os servidores nomeados para cargo de provimento efetivo em virtude de concurso público, mediante avaliação especial de desempenho por comissão.
- **Perda do Cargo do Servidor Estável**:
  1. Sentença judicial transitada em julgado;
  2. Processo administrativo em que lhe seja assegurada ampla defesa;
  3. Procedimento de avaliação periódica de desempenho, na forma de lei complementar;
  4. Excesso de despesa com pessoal (Art. 169 da CF).

#### Órgãos do Poder Judiciário (Art. 92):
São órgãos do Poder Judiciário:
I - o Supremo Tribunal Federal;
I-A - o Conselho Nacional de Justiça;
II - o Superior Tribunal de Justiça;
II-A - o Tribunal Superior do Trabalho;
III - os Tribunais Regionais Federais e Juízes Federais;
IV - os Tribunais e Juízes do Trabalho;
V - os Tribunais e Juízes Eleitorais;
VI - os Tribunais e Juízes Militares;
VII - os Tribunais e Juízes dos Estados e do Distrito Federal e Territórios.
*Atenção*: O CNJ é órgão do Poder Judiciário, mas **não possui função jurisdicional** (não julga processos das partes, apenas controle administrativo e disciplinar).
    `,
    vunespTips: [
      'Cuidado: o prazo de validade do concurso é de ATÉ 2 anos (pode ser 6 meses ou 1 ano, prorrogável por igual período).',
      'A acumulação remunerada permitida pela CF sempre exige COMPATIBILIDADE DE HORÁRIOS.'
    ]
  },

  // DIREITO PENAL
  {
    id: 'penal-funcionais',
    title: 'Código Penal: Crimes Praticados por Funcionário Público (Arts. 312 a 327)',
    subjectId: 'penal',
    subjectName: 'Direito Penal',
    category: 'direito',
    bloc: 'Bloco II',
    importance: 'Altíssima',
    summary: 'Os tipos penais mais frequentes na prova de Escrevente: Peculato, Concussão, Corrupção Passiva, Prevaricação e Violação de Sigilo Funcional.',
    keyArticles: 'Artigos 312 a 327 do Código Penal.',
    fullContent: `
### Crimes Funcionais em Espécie:

#### 1. Peculato (Art. 312):
- **Peculato-Apropriação/Desvio (Caput)**: Apropriar-se de dinheiro, valor ou qualquer outro bem móvel público ou particular de que tem a posse em razão do cargo, ou desviá-lo em proveito próprio ou alheio. Pena: reclusão, de 2 a 12 anos.
- **Peculato-Furto (§ 1º)**: O funcionário não tem a posse, mas subtrai ou concorre para que seja subtraído valendo-se da facilidade que o cargo lhe proporciona.
- **Peculato Culposo (§ 2º)**: O funcionário concorre culposamente (por negligência) para o crime de outrem.
  - **Reparação do dano no peculato culposo (§ 3º)**:
    - Se precede à sentença irrecorrível: **EXTINGUE A PUNIBILIDADE**!
    - Se é posterior: **REDUZ DE METADE A PENA IMPOSTA**! (Clássica pegadinha de prova!).

#### 2. Concussão vs. Corrupção Passiva:
- **Concussão (Art. 316)**: O verbo nuclear é **EXIGIR**, para si ou para outrem, direta ou indiretamente, ainda que fora da função ou antes de assumi-la, mas em razão dela, vantagem indevida.
- **Corrupção Passiva (Art. 317)**: Os verbos nucleares são **SOLICITAR** ou **RECEBER**, para si ou para outrem, ou **ACEITAR PROMESSA** de tal vantagem.

#### 3. Prevaricação (Art. 319):
- Retardar ou deixar de praticar, indevidamente, ato de ofício, ou praticá-lo contra disposição expressa de lei, para **satisfazer interesse ou sentimento pessoal**.
- *Nota*: Se for praticado por **indulgência** (piedade/pena do subordinado), o crime é **Condescendência Criminosa (Art. 320)**.

#### 4. Outros Crimes Importantes:
- **Advocacia Administrativa (Art. 321)**: Patrocinar, direta ou indiretamente, interesse privado perante a administração pública, valendo-se da qualidade de funcionário.
- **Abandono de Função (Art. 323)**: Abandonar cargo público, fora dos casos permitidos em lei.
- **Conceito de Funcionário Público para fins penais (Art. 327)**: Considera-se funcionário público quem, embora transitoriamente ou sem remuneração, exerce cargo, emprego ou função pública.
  - § 1º Equipara-se quem exerce em entidade paraestatal ou empresa prestadora de serviços contratada pelo poder público.
  - § 2º Pena aumentada da terça parte se for ocupante de cargos em comissão ou função de direção.
    `,
    vunespTips: [
      'EXIGIR = Concussão. SOLICITAR/RECEBER = Corrupção Passiva. OFERECER/PROMETER (particular) = Corrupção Ativa.',
      'Lembre-se: satisfazer sentimento pessoal = Prevaricação. Fazer vista grossa por pena/indulgência = Condescendência Criminosa.'
    ],
    practiceQuestions: [
      {
        id: 'q-penal-1',
        year: '2023',
        exam: 'VUNESP - TJ-SP',
        statement: 'No crime de peculato culposo, a reparação do dano, se precede à sentença irrecorrível:',
        options: [
          'Atenua a pena em um terço.',
          'Reduz pela metade a pena imposta.',
          'Extingue a punibilidade do agente.',
          'Não produz efeitos jurídicos sobre a pena corporal.',
          'Isenta o réu apenas do pagamento de custas.'
        ],
        correctIndex: 2,
        explanation: 'Art. 312, § 3º, primeira parte: no peculato culposo, a reparação prévia do dano extingue a punibilidade.'
      }
    ]
  },
  {
    id: 'penal-fe-publica',
    title: 'Código Penal: Crimes Contra a Fé Pública e Administração da Justiça',
    subjectId: 'penal',
    subjectName: 'Direito Penal',
    category: 'direito',
    bloc: 'Bloco II',
    importance: 'Alta',
    summary: 'Falsidade ideológica, uso de documento falso, fraude em concurso, falso testemunho e denunciação caluniosa.',
    keyArticles: 'Artigos 297 a 305, 307, 308, 311-A, 339 a 347, 357 do CP.',
    fullContent: `
### Fé Pública e Justiça:
- **Falsificação de Documento Público (Art. 297)** vs **Falsidade Ideológica (Art. 299)**:
  - No art. 297, o documento é materialmente forjado ou alterado.
  - No art. 299, o documento é materialmente autêntico, mas contém declaração falsa ou diversa da que devia constar.
- **Fraudes em Certames de Interesse Público (Art. 311-A)**: Utilizar ou divulgar indevidamente o conteúdo sigiloso de concurso público, exame ou vestibular.
- **Denunciação Caluniosa (Art. 339)**: Dar causa à instauração de inquérito policial, processo judicial, investigação administrativa contra alguém, imputando-lhe crime ou ato ímprobo de que o sabe inocente.
- **Falso Testemunho ou Falsa Perícia (Art. 342)**: Fazer afirmação falsa, negar ou calar a verdade como testemunha, perito, tradutor ou intérprete.
  - § 2º: O fato deixa de ser punível se, **antes da sentença no processo em que ocorreu o ilícito**, o agente se retrata ou declara a verdade.
    `,
    vunespTips: [
      'A retratação no falso testemunho tem que ser ANTES da sentença do processo em que depôs.'
    ]
  },

  // DIREITO PROCESSUAL CIVIL
  {
    id: 'cpc-atos-prazos',
    title: 'CPC: Atos Processuais, Prazos e Auxiliares da Justiça (Arts. 144 a 275)',
    subjectId: 'cpc',
    subjectName: 'Direito Processual Civil',
    category: 'direito',
    bloc: 'Bloco II',
    importance: 'Altíssima',
    summary: 'Impedimentos vs. Suspeição, atribuições do Escrivão/Chefe de Secretaria, prazos em dias úteis e regras de Citação e Intimação.',
    keyArticles: 'Artigos 144 a 155, 188 a 275 do CPC.',
    fullContent: `
### 1. Impedimento (Art. 144) vs. Suspeição (Art. 145):
- **Impedimento (Vício Objetivo e Grave)**:
  - Há parentesco consanguíneo ou afim até o 3º grau;
  - O juiz foi advogado, perito, membro do MP ou testemunha na causa;
  - For parte o juiz, seu cônjuge, companheiro ou parente até 3º grau.
- **Suspeição (Vício Subjetivo)**:
  - Amigo íntimo ou inimigo de qualquer das partes ou de seus advogados;
  - Devedor ou credor da parte ou parente;
  - Interessado no julgamento da causa.

### 2. Atribuições do Escrivão / Chefe de Secretaria (Art. 152):
Incumbe ao escrivão ou ao chefe de secretaria:
I - redigir, em forma legal, os ofícios, os mandados, os editais e os demais atos da secretaria;
II - efetivar as ordens judiciais, realizar citações e intimações;
III - comparecer às audiências ou designar servidor para fazê-lo;
IV - manter sob sua guarda e responsabilidade os autos;
V - certificar a tempestividade dos recursos e atos.

### 3. Prazos Processuais no CPC (Art. 219):
- Na contagem de prazo em dias, estabelecido por lei ou pelo juiz, computar-se-ão **SOMENTE OS DIAS ÚTEIS**! (Apenas para prazos de natureza processual).
- Exclui-se o dia do começo e inclui-se o dia do vencimento.
- **Prazos em dobro**: A Fazenda Pública (União, Estados, DF, Municípios e suas autarquias) e o Ministério Público gozam de prazo em **DOBRO** para todas as suas manifestações (Arts. 180 e 183).
    `,
    vunespTips: [
      'No CPC, a contagem é SEMPRE em dias úteis. Cuidado para não confundir com o CPP (que conta em dias corridos!).',
      'Defensoria Pública e Ministério Público têm prazo em dobro.'
    ]
  },
  {
    id: 'cpc-procedimento-recursos',
    title: 'CPC: Procedimento Comum, Tutelas e Recursos (Arts. 294 a 368 + 994 a 1026)',
    subjectId: 'cpc',
    subjectName: 'Direito Processual Civil',
    category: 'direito',
    bloc: 'Bloco II',
    importance: 'Altíssima',
    summary: 'Tutelas provisórias, petição inicial, contestação, revelia, apelação, agravo de instrumento e embargos de declaração.',
    keyArticles: 'Arts. 294 a 311, 318 a 357, 994 a 1026 do CPC.',
    fullContent: `
### Tutelas Provisórias:
- **Tutela de Urgência**: Exige probabilidade do direito + perigo de dano ou risco ao resultado útil do processo (fumus boni iuris + periculum in mora).
- **Tutela de Evidência (Art. 311)**: Independe da demonstração de perigo de dano ou risco! Concedida quando houver abuso de direito de defesa, teses repetitivas com prova documental cabal, etc.

### Fases do Procedimento Comum:
1. **Petição Inicial (Art. 319)**: Emenda em 15 dias sob pena de indeferimento.
2. **Audiência de Conciliação/Mediação (Art. 334)**: Não será realizada se ambas as partes manifestarem desinteresse ou a matéria não admitir autocomposição.
3. **Contestação (Art. 335)**: Prazo de **15 dias úteis**.
4. **Revelia (Art. 344)**: O réu citado que não contesta. Efeito: presumem-se verdadeiras as alegações fáticas do autor.

### Sistema Recursal:
- **Apelação (Art. 1009)**: Cabe contra **sentença**. Prazo: 15 dias úteis.
- **Agravo de Instrumento (Art. 1015)**: Cabe contra decisões interlocutórias do rol legal (ex.: tutelas provisórias, rejeição de gratuidade da justiça). Prazo: 15 dias úteis.
- **Embargos de Declaração (Art. 1022)**: Omissão, obscuridade, contradição ou erro material. **Prazo de 5 dias úteis**! Interrompe o prazo para outros recursos.
    `,
    vunespTips: [
      'Embargos de Declaração têm prazo de 5 dias e INTERROMPEM o prazo recursal (o prazo zera e recomeça inteiro).',
      'Tutela de evidência NÃO precisa de perigo de dano.'
    ]
  },

  // DIREITO PROCESSUAL PENAL
  {
    id: 'cpp-atos-procedimentos',
    title: 'CPP: Citações, Prisões, Procedimento Ordinário e Júri (Arts. 251 a 497)',
    subjectId: 'cpp',
    subjectName: 'Direito Processual Penal',
    category: 'direito',
    bloc: 'Bloco II',
    importance: 'Altíssima',
    summary: 'Citações por mandado, hora certa e edital (art. 366), resposta à acusação, absolvição sumária (art. 397) e fases do Tribunal do Júri.',
    keyArticles: 'Artigos 251 a 274, 351 a 372, 394 a 497 do CPP.',
    fullContent: `
### Citações no Processo Penal:
- **Regra**: Citação pessoal por mandado realizada por Oficial de Justiça.
- **Citação por Hora Certa (Art. 362)**: Se o réu se oculta para não ser citado, aplica-se a citação por hora certa.
- **Citação por Edital (Art. 366)**: Se o réu citado por edital não comparece nem constitui advogado:
  - Ficam **suspensos o processo E o curso do prazo prescricional**;
  - O juiz pode determinar a produção antecipada de provas urgentes e decretar prisão preventiva, se presentes os requisitos.

### Procedimento Comum Ordinário:
- Oferecida a denúncia/queixa e recebida pelo juiz, o réu é citado para apresentar **Resposta à Acusação no prazo de 10 dias corridos** (Art. 396).
- **Absolvição Sumária (Art. 397)**: O juiz absolverá desde logo se verificar:
  I - a existência manifesta de causa excludente da ilicitude;
  II - causa excludente da culpabilidade, salvo inimputabilidade;
  III - atipicidade evidente do fato;
  IV - extinta a punibilidade.

### Tribunal do Júri (Julgamento dos Crimes Dolosos Contra a Vida):
1. **Pronúncia**: Juiz convencido da materialidade e indícios suficientes de autoria. O réu vai a júri popular.
2. **Impronúncia**: Falta de provas da materialidade ou indícios de autoria.
3. **Absolvição Sumária**: Provada inexistência do fato, não ser ele o autor, ou demonstrada causa de isenção de pena.
4. **Desclassificação**: O crime não é doloso contra a vida; remete para juízo competente.
    `,
    vunespTips: [
      'No CPP os prazos correm de forma CONTÍNUA (dias corridos), não se interrompendo em feriados, computando-se dia do vencimento.',
      'Atenção ao art. 366: suspende processo E prescrição.'
    ]
  },

  // DIREITO ADMINISTRATIVO & LEGISLAÇÃO INTERNA
  {
    id: 'adm-estatuto-sp',
    title: 'Estatuto dos Funcionários Públicos Civis de SP (Lei 10.261/1968)',
    subjectId: 'adm',
    subjectName: 'Direito Administrativo',
    category: 'direito',
    bloc: 'Bloco II',
    importance: 'Altíssima',
    summary: 'Provimento, posse, exercício, deveres funcionais, proibições, penalidades disciplinares e prescrição administrativa.',
    keyArticles: 'Arts. 1º a 86, 171 a 175, 239 a 323 da Lei Estadual 10.261/1968.',
    fullContent: `
### Prazos Essenciais do Estatuto Paulista:
- **Posse**: Deve ser tomada no prazo de **30 dias**, contados da data da publicação do ato de nomeação (prorrogável por mais 30 dias a pedido).
- **Exercício**: O início do exercício terá lugar no prazo de **30 dias**, contados da data da posse.

### Deveres e Proibições do Servidor:
- **Deveres (Art. 241)**: Ser assíduo e pontual, cumprir ordens superiores (salvo se manifestamente ilegais), guardar sigilo sobre assuntos da repartição, tratar com urbanidade as partes.
- **Proibições (Art. 242)**: Retirar sem autorização documento da repartição, entreter-se durante as horas de trabalho em palestras alheias ao serviço, exercer comércio entre companheiros de serviço.

### Penalidades Disciplinares (Art. 251):
São penas disciplinares:
I - repreensão;
II - suspensão (máximo de 90 dias);
III - multa;
IV - demissão;
V - demissão a bem do serviço público (hipóteses mais graves: improbidade, insubordinação grave, corrupção);
VI - cassação de aposentadoria ou disponibilidade.

### Prescrição da Ação Disciplinar:
- Repreensão, suspensão e multa: prescrevem em **2 anos**.
- Demissão, demissão a bem do serviço público e cassação: prescrevem em **5 anos**.
    `,
    vunespTips: [
      'Posse: 30 dias prorrogável por 30. Exercício: 30 dias.',
      'Suspensão disciplinar: limite máximo de 90 dias.'
    ]
  },
  {
    id: 'adm-eproc-teletrabalho',
    title: 'Legislação Interna: Sistema eproc (Res. 963/25) e Teletrabalho (Res. 850/21)',
    subjectId: 'normas',
    subjectName: 'Legislação Interna TJSP',
    category: 'direito',
    bloc: 'Bloco II',
    importance: 'Altíssima',
    summary: 'Governança e uso do sistema eproc nas unidades judiciais do TJSP (NOVIDADE do edital) e regras de teletrabalho no Tribunal.',
    keyArticles: 'Resolução TJSP nº 963/2025 e Resolução TJSP nº 850/2021.',
    fullContent: `
### Resolução TJSP nº 963/2025 - Sistema eproc (NOVIDADE HISTÓRICA NO EDITAL):
O Tribunal de Justiça de São Paulo estabeleceu o **eproc** como o sistema oficial de processamento judicial eletrônico, substituindo gradativamente o SAJ.
- **Objetivos**: Padronização, interoperabilidade, tramitação ágil e uso de automações na gestão de expedientes.
- **Prática de Atos**: Os atos das partes e serventuários são autenticados mediante certificado digital ICP-Brasil ou login corporativo próprio.
- **Indisponibilidade do Sistema**: Se o eproc ficar indisponível no dia do vencimento do prazo por tempo superior a determinado limite no final do expediente, os prazos são prorrogados para o primeiro dia útil seguinte.

### Resolução TJSP nº 850/2021 - Teletrabalho no TJSP:
- O teletrabalho é facultativo e condicionado ao interesse da Administração.
- **Metas de desempenho**: O servidor em teletrabalho deve apresentar rendimento superior ou igual ao presencial (geralmente fixado acréscimo de meta).
- Não podem fazer teletrabalho: servidores em estágio probatório (salvo autorização motivada), servidores que tenham sofrido penalidade disciplinar recente ou em locais onde o atendimento presencial ficaria desguarnecido.
    `,
    vunespTips: [
      'A inclusão da Resolução 963/2025 é o ponto novo do edital. A Vunesp certamente cobrará definições sobre tramitação eletrônica no eproc e deveres do usuário.'
    ]
  },
  {
    id: 'adm-normas-cgj',
    title: 'Normas da Corregedoria Geral da Justiça (NSCGJ - Tomo I)',
    subjectId: 'normas',
    subjectName: 'Normas da Corregedoria',
    category: 'direito',
    bloc: 'Bloco II',
    importance: 'Altíssima',
    summary: 'Ofícios de justiça, correições, livros e classificadores obrigatórios, numeração de autos, cargas e processo eletrônico.',
    keyArticles: 'Tomo I - Caps. II, III e XI das Normas da Corregedoria.',
    fullContent: `
### Pontos Capitais das NSCGJ para Escrevente:
- **Correições (Cap. II)**:
  - *Correição Ordinária*: Anunciada com antecedência mínima de 15 dias, realizada anualmente pelo Juiz Corregedor Permanente.
  - *Correição Extraordinária*: Sem aviso prévio, realizada quando constatadas irregularidades.
  - *Visita Correcional*: Aferição do andamento regular dos serviços e constatação do estado das instalações.

- **Livros Obrigatórios (Cap. III)**:
  - Livro de Visitas e Correições;
  - Livro de Cargas de Autos (hoje substituído por registros em sistema informatizado);
  - Livro de Registro Geral de Feitos;
  - Todos os livros têm termo de abertura e de encerramento lavrados pelo Escrivão e rubricados pelo Juiz.

- **Autuação e Numeração de Autos**:
  - As folhas dos autos serão numeradas no canto superior direito e rubricadas pelo serventuário.
  - É proibido usar corretor líquido, rasurar ou deixar espaços em branco nas certidões.

- **Processo Judicial Eletrônico (Cap. XI)**:
  - Peticionamento eletrônico: pode ser feito até às 23h59min do último dia do prazo.
  - Documentos ilegíveis devem ser rejeitados ou o advogado intimado a regularizar.
    `,
    vunespTips: [
      'A numeração é no canto superior direito e as certidões não podem ter rasuras ou corretores.',
      'A Correição Ordinária é anual e tem edital publicado com antecedência.'
    ]
  }
];
