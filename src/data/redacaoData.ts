export interface RedacaoTheme {
  id: string;
  title: string;
  axis: string;
  contextText: string;
  focusQuestions: string[];
}

export const redacaoThemesData: RedacaoTheme[] = [
  {
    id: 'tema-1',
    title: 'A digitalização do Poder Judiciário e os limites entre a celeridade e a garantia de acesso à justiça',
    axis: 'Tecnologia e Cidadania',
    contextText: `Texto 1: A virtualização dos processos e o uso de inteligência artificial permitiram reduzir sensivelmente o tempo médio de tramitação das ações no Brasil. Plataformas de autoatendimento e audiências telemáticas aproximaram os operadores do direito da tramitação em tempo real.
Texto 2: Não obstante os avanços, pesquisas apontam que cerca de 30 milhões de brasileiros não possuem acesso regular à internet de qualidade ou capacidade para interagir com serviços exclusivamente digitais, gerando um risco palpável de exclusão e cerceamento de defesa nos balcões virtuais.`,
    focusQuestions: [
      'Quais são os principais ganhos gerados pela justiça 100% digital?',
      'Como resguardar o acesso material dos cidadãos em situação de vulnerabilidade e exclusão digital?',
      'Qual deve ser o papel dos canais presenciais de acolhimento nos fóruns estaduais?'
    ]
  },
  {
    id: 'tema-2',
    title: 'O teletrabalho no serviço público contemporâneo: equilíbrio entre produtividade institucional e direitos funcionais',
    axis: 'Administração Pública e Trabalho',
    contextText: `Texto 1: O modelo híbrido e o teletrabalho na administração judicial proporcionaram economias substanciais com insumos, manutenção predial e deslocamento, resultando frequentemente em índices de produtividade superiores às metas do trabalho presencial.
Texto 2: Especialistas em saúde do trabalhador alertam, contudo, para a diluição das fronteiras entre a vida privada e o ofício profissional, o risco de sobrecarga silenciosa e a necessidade de respeito ao direito à desconexão.`,
    focusQuestions: [
      'Quais as vantagens da flexibilização do trabalho remoto nos órgãos públicos?',
      'Como a administração pode monitorar metas sem comprometer a saúde mental dos servidores?',
      'Como garantir a preservação da excelência no atendimento ao público presencial?'
    ]
  },
  {
    id: 'tema-3',
    title: 'A inteligência artificial na sociedade da informação: entre o progresso técnico e a proteção da privacidade',
    axis: 'Direitos Fundamentais e Inovação',
    contextText: `Texto 1: O processamento massivo de dados por modelos algorítmicos revolucionou diagnósticos médicos, predição de riscos climáticos e otimização de políticas públicas em escala inédita.
Texto 2: A coleta indiscriminada de dados biométricos, comportamentais e pessoais acende debates globais sobre vigilância estatal, vazamento de registros confidenciais e a perda de controle do indivíduo sobre sua própria intimidade.`,
    focusQuestions: [
      'Qual o impacto do avanço de sistemas de IA na vida diária do cidadão?',
      'Quais são as salvaguardas necessárias para preservar a dignidade e a autodeterminação informativa?'
    ]
  },
  {
    id: 'tema-4',
    title: 'Desafios contemporâneos para a efetivação da acessibilidade e da inclusão plena da pessoa com deficiência',
    axis: 'Direitos Humanos e Inclusão Social',
    contextText: `Texto 1: O Estatuto da Pessoa com Deficiência (Lei 13.146/2015) consagrou o modelo social da deficiência, enfatizando que a limitação não reside no indivíduo, mas nas barreiras arquitetônicas, urbanísticas e atitudinais impostas pela sociedade.
Texto 2: Na prática, vagas de emprego afirmativas ainda sofrem resistência velada e espaços urbanos frequentemente desconsideram calçadas acessíveis, sinalização tátil e transporte público verdadeiramente inclusivo.`,
    focusQuestions: [
      'O que diferencia o modelo médico tradicional do modelo biopsicossocial de acessibilidade?',
      'Quais medidas institucionais e culturais são urgentes para superar o preconceito e as barreiras atitudinais?'
    ]
  }
];
