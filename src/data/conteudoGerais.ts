import { TopicItem } from '../types';

export const topicsGerais: TopicItem[] = [
  // LÍNGUA PORTUGUESA (BLOCO I)
  {
    id: 'port-crase',
    title: 'Português: Emprego do Acento Indicativo de Crase',
    subjectId: 'port',
    subjectName: 'Língua Portuguesa',
    category: 'portugues',
    bloc: 'Bloco I',
    importance: 'Altíssima',
    summary: 'A crase é a fusão da preposição "a" com o artigo feminino "a" (ou pronomes demonstrativos). Questão certa e garantida em toda prova da VUNESP.',
    fullContent: `
### Guia Prático da Crase para a VUNESP:

#### 1. Casos Proibidos (Nunca ocorre crase):
1. **Antes de palavras masculinas**: "Andamos a pé", "Escreveu a lápis", "Pagou a prazo".
2. **Antes de verbos**: "Começou a chorar", "Estava a passear".
3. **Antes da maioria dos pronomes**: "Disse a ela", "Entregou a mim", "Falou a você", "Pediu a esta mulher". *(Exceção: pronomes de tratamento senhora, senhorita e dona admitem crase!)*.
4. **Quando o "a" está no singular diante de palavra no plural**: "Referiu-se a pessoas desconhecidas" (Se fosse "às pessoas", teria crase!).
5. **Entre palavras repetidas**: "Cara a cara", "Gota a gota", "Dia a dia".

#### 2. Casos Obrigatórios:
1. **Locuções prepositivas, conjuntivas e adverbiais femininas**:
   - Adverbiais: *à tarde, à noite, às pressas, à toa, às vezes, à risca*.
   - Prepositivas: *à espera de, à procura de, à custa de, à medida que*.
   - Conjuntivas: *à proporção que*.
2. **Indicação de horas exatas**: "Chegou às 14 horas", "A reunião será às 9h". *(Cuidado: com preposições como desde, para ou até: "A reunião está marcada para as 9h" - sem crase!)*.
3. **Subentendida a locução "à moda de"**: "Gol à Pelé", "Bife à milanesa".

#### 3. Casos Facultativos (Mnemônico: ATÉ a sua MARIA):
1. Depois da preposição **ATÉ**: "Foi até a (ou à) praia".
2. Antes de pronomes possessivos femininos singulares (**SUA, MINHA, TUA, NOSSA**): "Entreguei a carta a sua (ou à sua) mãe".
3. Antes de nomes próprios femininos (**MARIA, ANA...**): "Enviei flores a Mariana (ou à Mariana)".
    `,
    vunespTips: [
      'Faça o teste da troca pela palavra masculina: se virar "AO", tem crase! ("Fui à cidade" -> "Fui AO campo").',
      'Cuidado com a expressão "a partir de" (verbo: nunca tem crase!).'
    ],
    practiceQuestions: [
      {
        id: 'q-port-1',
        year: '2023',
        exam: 'VUNESP',
        statement: 'Assinale a alternativa em que o sinal indicativo de crase está empregado corretamente:',
        options: [
          'O escrevente começou à redigir a certidão no computador.',
          'O advogado solicitou o desarquivamento dos autos à uma hora.',
          'As informações foram transmitidas às pressas para o juiz da vara.',
          'Todos os pedidos foram formulados passo à passo.',
          'O candidato submeteu o requerimento à ela ontem.'
        ],
        correctIndex: 2,
        explanation: '"Às pressas" é locução adverbial feminina de modo, exigindo acento indicativo de crase.'
      }
    ]
  },
  {
    id: 'port-concordancia',
    title: 'Português: Concordância Verbal e Nominal',
    subjectId: 'port',
    subjectName: 'Língua Portuguesa',
    category: 'portugues',
    bloc: 'Bloco I',
    importance: 'Altíssima',
    summary: 'Regras de concordância com o verbo haver, fazer, partícula apassivadora "se", índice de indeterminação e adjetivos compostos.',
    fullContent: `
### Regras de Ouro da VUNESP em Concordância:

#### 1. Verbos Impessoais (Ficam OBRIGATORIAMENTE no singular):
- **HAVER**:
  - No sentido de **existir, ocorrer ou acontecer**: "Havia muitas pessoas na sala" (NUNCA "Haviam muitas pessoas").
  - Indicando **tempo decorrido**: "Há três anos não o vejo".
  - *Atenção à locução verbal*: Se o verbo haver for o principal, ele transmite sua impessoalidade para o verbo auxiliar! -> "Deve haver muitos recursos", "Pode haver problemas" (ambos no singular!).
- **FAZER**: Indicando tempo transcorrido ou fenômeno climático: "Faz dois meses que estudo", "Fazia dias quentes".

#### 2. Voz Passiva Sintética vs. Índice de Indeterminação do Sujeito:
- **Voz Passiva Sintética (Verbo Transitivo Direto + SE)**:
  - O verbo **CONCORDA** com o sujeito paciente!
  - "Vende-se **uma casa**" / "Vendem-se **casas**".
  - "Expediu-se **o mandado**" / "Expediram-se **os mandados**".
- **Índice de Indeterminação do Sujeito (Verbo Transitivo Indireto / Intransitivo / de Ligação + SE)**:
  - O verbo fica **SEMPRE NO SINGULAR**!
  - "Precisa-se de serventuários" (VTI + preposição 'de').
  - "Trata-se de processos antigos".
    `,
    vunespTips: [
      'Se tiver preposição depois do "se" (de, em, a), o verbo NÃO vai para o plural! ("Necessita-se de peritos").'
    ]
  },
  {
    id: 'port-conjuncoes',
    title: 'Português: Conjunções Coordenativas, Subordinativas e Sentido',
    subjectId: 'port',
    subjectName: 'Língua Portuguesa',
    category: 'portugues',
    bloc: 'Bloco I',
    importance: 'Altíssima',
    summary: 'A VUNESP cobra o sentido das conjunções e pede a substituição mantendo o sentido original do texto sem alteração gramatical.',
    fullContent: `
### Tabela de Conjunções Campeãs de Prova:

1. **Adversativas (Ideia de Oposição / Contraste)**:
   - *Mas, porém, contudo, todavia, entretanto, no entanto, não obstante*.
2. **Concessivas (Ideia de Quebra de Expectativa / Ressalva - campeã absoluta!)**:
   - *Embora, conquanto, ainda que, mesmo que, se bem que, posto que, a despeito de, malgrado*.
   - Exemplo: "Embora estivesse cansado, continuou estudando".
3. **Causais (Motivo / Causa da oração principal)**:
   - *Porque, visto que, já que, uma vez que, como (no início da frase), na medida em que*.
4. **Consecutivas (Consequência decorrente da causa)**:
   - *Tanto... que, de modo que, de forma que, tamanho... que*.
5. **Proporcionais (Simultaneidade progressiva)**:
   - *À medida que, à proporção que, ao passo que*. *(Atenção: "na medida em que" é causal; "à medida que" é proporcional!)*.
6. **Condicionais (Condição / Hipótese)**:
   - *Se, caso, contanto que, desde que (com verbo no subjuntivo)*.
    `,
    vunespTips: [
      'A Vunesp adora colocar "conquanto" e perguntar se pode substituir por "embora" mantendo o sentido (pode!).',
      'Cuidado: "ao passo que" é proporcional/contrastivo; "a despeito de" é concessivo.'
    ]
  },

  // INFORMÁTICA (BLOCO III)
  {
    id: 'info-excel',
    title: 'Informática: MS-Excel 365 (Fórmulas, Funções e Atalhos)',
    subjectId: 'info',
    subjectName: 'Informática',
    category: 'gerais',
    bloc: 'Bloco III',
    importance: 'Altíssima',
    summary: 'Funções mais cobradas pela VUNESP: SOMA, MÉDIA, SE, CONT.SE, SOMASE, PROCV e a crucial diferença entre referências relativas e absolutas com $.',
    fullContent: `
### Fórmulas e Lógica do MS-Excel 365:

#### 1. Sintaxe das Funções Principais:
- **Intervalo com dois pontos (:)**: Significa "ATÉ". Ex.: \`=SOMA(A1:A5)\` soma A1, A2, A3, A4 e A5.
- **Intervalo com ponto e vírgula (;)**: Significa "E". Ex.: \`=SOMA(A1;A5)\` soma apenas as células A1 e A5!
- **MÉDIA()**: Calcula a média aritmética dos valores informados.
- **SE(teste_lógico; valor_se_verdadeiro; valor_se_falso)**:
  - Exemplo: \`=SE(A1>=7; "Aprovado"; "Reprovado")\`.
- **CONT.SE(intervalo; critério)**: Conta quantas células atendem a um critério. Ex.: \`=CONT.SE(B1:B10; ">50")\`.
- **SOMASE(intervalo; critério; [intervalo_soma])**: Soma somente as células que atendem a uma condição.

#### 2. Referências Relativas e Absolutas (O Cifrão $):
- \`A1\`: Relativa (se copiar para o lado ou para baixo, linha e coluna mudam).
- \`$A$1\`: Absoluta total (linha e coluna travadas, não mudam ao arrastar a alça de preenchimento).
- \`$A1\`: Coluna A travada, linha livre.
- \`A$1\`: Linha 1 travada, coluna livre.
    `,
    vunespTips: [
      'Questão clássica da VUNESP: uma célula com fórmula \`=$B$2+C1\` é arrastada para a célula vizinha. O que acontece com a fórmula? Lembre que o cifrão trava a letra ou o número que vem imediatamente depois dele!'
    ]
  },
  {
    id: 'info-word-teams',
    title: 'Informática: MS-Word 365, Teams e OneDrive',
    subjectId: 'info',
    subjectName: 'Informática',
    category: 'gerais',
    bloc: 'Bloco III',
    importance: 'Alta',
    summary: 'Quebras de página vs seção no Word, navegação no Teams, canais e compartilhamento no OneDrive.',
    fullContent: `
### Recursos MS-Office 365:

#### MS-Word:
- **Quebra de Página**: Força o texto seguinte a começar na próxima página sem alterar cabeçalhos ou orientação.
- **Quebra de Seção**: Permite alterar configurações de página dentro do mesmo documento (ex.: uma página em retrato e a seguinte em paisagem, ou numeração de página diferente).
- **Atalhos no Word (Versão em Português)**:
  - \`Ctrl + B\`: Salva o documento.
  - \`Ctrl + A\`: Abre um documento existente.
  - \`Ctrl + T\`: Seleciona todo o texto.
  - \`Ctrl + Z\`: Desfaz a última ação.
  - \`Ctrl + Y\`: Refaz a ação.
  - \`Ctrl + J\`: Justifica o texto.

#### MS-Teams e OneDrive:
- **Teams**: Plataforma unificada de comunicação corporativa do TJSP. Suporta chamadas de vídeo, compartilhamento de tela com som, canais públicos e privados, agendamento de reuniões sincronizado com o calendário do Outlook.
- **OneDrive**: Armazenamento na nuvem corporativa da Microsoft. Permite coautoria simultânea de documentos, histórico de versões e links com prazo de expiração ou restrição de edição.
    `,
    vunespTips: [
      'No Word em português, \`Ctrl + B\` NÃO é negrito! \`Ctrl + B\` SALVA o documento! Negrito no Word em português é \`Ctrl + N\`!'
    ]
  },

  // RACIOCÍNIO LÓGICO (BLOCO III)
  {
    id: 'rlm-tabela-verdade',
    title: 'Raciocínio Lógico: Tabela-Verdade e Operadores',
    subjectId: 'rlm',
    subjectName: 'Raciocínio Lógico',
    category: 'gerais',
    bloc: 'Bloco III',
    importance: 'Altíssima',
    summary: 'Tabela-verdade dos conectivos (E, OU, SE... ENTÃO, SE E SOMENTE SE, OU EXCLUSIVO). Dominar essa lógica garante 5 das 7 questões de RLM.',
    fullContent: `
### Resumo Supremo dos Conectivos Lógicos:

| Conectivo | Símbolo | Nome | Regra de Ouro |
|---|:---:|---|---|
| **E** | $\\land$ | Conjunção | Só é **VERDADE** se ambas forem verdadeiras. |
| **OU** | $\\lor$ | Disjunção Inclusiva | É **VERDADE** se pelo menos uma for verdadeira. |
| **OU... OU** | $\\underline{\\lor}$ | Disjunção Exclusiva | Só é **VERDADE** se tiverem valores opostos (uma V e outra F). |
| **SE... ENTÃO** | $\\to$ | Condicional | Só é **FALSA** no caso Vera Fischer ($V \\to F = F$). |
| **SE E SOMENTE SE** | $\\leftrightarrow$ | Bicondicional | É **VERDADE** se ambas forem iguais ($V-V$ ou $F-F$). |

#### Negações Frequentes na VUNESP:
- **Negação do E e do OU (De Morgan)**:
  - $\\neg(A \\land B) \\equiv \\neg A \\lor \\neg B$
  - $\\neg(A \\lor B) \\equiv \\neg A \\land \\neg B$
- **Negação do SE... ENTÃO (Mnemônico do MANÉ)**:
  - $\\neg(A \\to B) \\equiv A \\land \\neg B$
  - **MA**ntém a primeira **NÉ**ga a segunda!
  - Exemplo: A negação de "Se estudo, então passo" é: "Estudo E não passo".

#### Equivalências Lógicas da Condicional ($A \\to B$):
1. **Contrapositiva ("Inverte e Nega Tudo")**:
   - $A \\to B \\equiv \\neg B \\to \\neg A$
   - Exemplo: "Se chove, a rua molha" $\\equiv$ "Se a rua não está molhada, não choveu".
2. **Equivalência com o OU (Regra do NÉYMAR)**:
   - $A \\to B \\equiv \\neg A \\lor B$
   - **NÉ**ga a primeira ou **MA**ntém a segunda.
    `,
    vunespTips: [
      'A negação de uma condicional NUNCA começa com "Se". Se a questão pedir a negação de "Se P, então Q", elimine de cara as alternativas que começam com "Se"!'
    ]
  },

  // MATEMÁTICA (BLOCO III)
  {
    id: 'mat-essencial',
    title: 'Matemática: Razão, Proporção, Regra de Três, Porcentagem e Juros',
    subjectId: 'mat',
    subjectName: 'Matemática',
    category: 'gerais',
    bloc: 'Bloco III',
    importance: 'Alta',
    summary: 'Aritmética prática da VUNESP: resolução de problemas envolvendo fração, proporção direta/inversa, porcentagem e juros simples.',
    fullContent: `
### Fórmulas e Técnicas Rápidas:

#### 1. Razão e Proporção:
- Razão é a divisão entre duas grandezas $\\frac{a}{b}$.
- Em proporções, o produto dos extremos é igual ao produto dos meios ($a \\cdot d = b \\cdot c$).
- Divisão em partes proporcionais: Some as partes e divida o total para encontrar a constante de proporcionalidade $k$.

#### 2. Regra de Três:
- **Diretamente Proporcionais**: Se uma grandeza sobe, a outra sobe na mesma proporção. Multiplica-se em "X" (cruzado).
- **Inversamente Proporcionais**: Se uma sobe, a outra desce (ex.: quantidade de operários e dias de trabalho; velocidade e tempo). Multiplica-se em linha reta!

#### 3. Juros Simples:
- Fórmula: $J = C \\cdot i \\cdot t$
  - $J$: Juros
  - $C$: Capital inicial
  - $i$: Taxa de juros (atenção: deve estar na mesma unidade de tempo do período $t$)
  - $t$: Tempo/período
- Montante: $M = C + J$

#### 4. Geometria Prática:
- Teorema de Pitágoras: $a^2 = b^2 + c^2$ (Triângulo clássico: 3, 4, 5 ou múltiplos 6, 8, 10).
- Área do retângulo: $Base \\times Altura$.
- Volume da caixa/paralelepípedo: $Comprimento \\times Largura \\times Altura$.
    `,
    vunespTips: [
      'Verifique sempre se a taxa de juros e o tempo estão na mesma unidade (ex.: taxa ao mês com tempo em anos precisa de conversão!).'
    ]
  },

  // ATUALIDADES & ESTATUTO PCD (BLOCO III)
  {
    id: 'pcd-estatuto',
    title: 'Estatuto da Pessoa com Deficiência (Lei 13.146/2015)',
    subjectId: 'pcd',
    subjectName: 'Estatuto PCD',
    category: 'gerais',
    bloc: 'Bloco III',
    importance: 'Alta',
    summary: 'Conceito de pessoa com deficiência, avaliação biopsicossocial multiprofissional, acessibilidade, atendimento prioritário e direito ao trabalho.',
    keyArticles: 'Artigos 1º a 13 e 34 a 38 da Lei Federal 13.146/2015.',
    fullContent: `
### Artigos Cruciais do Estatuto PCD:
- **Conceito de Pessoa com Deficiência (Art. 2º)**: Considera-se pessoa com deficiência aquela que tem impedimento de longo prazo de natureza física, mental, intelectual ou sensorial, o qual, em interação com uma ou mais barreiras, pode obstruir sua participação plena e efetiva na sociedade em igualdade de condições com as demais pessoas.
- **Avaliação da Deficiência (§ 1º)**: Quando necessária, será **biopsicossocial**, realizada por equipe **multiprofissional e interdisciplinar**.
- **Atendimento Prioritário (Art. 9º)**: A pessoa com deficiência tem direito a atendimento prioritário em todos os órgãos públicos e serviços de emergência (salvo emergências de saúde em que o critério médico de gravidade do risco prevalece).
- **Direito ao Trabalho (Arts. 34 a 38)**:
  - Garantia de ambientes de trabalho acessíveis e inclusivos.
  - Vedação expressa de qualquer discriminação salarial ou critério de admissão por motivo de deficiência.
  - As pessoas jurídicas de direito público e privado são obrigadas a garantir ambientes acessíveis.
    `,
    vunespTips: [
      'A avaliação é BIOPSICOSSOCIAL e feita por equipe MULTIPROFISSIONAL. A Vunesp adora colocar que a avaliação é feita por "médico perito isolado", o que é falso.'
    ]
  }
];
