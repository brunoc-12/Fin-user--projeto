DESCRIBE T_USUARIOS;

INSERT INTO nome_tabela (coluna1, coluna2, coluna3) VALUES (valor1, valor2, valor3);

INSERT INTO T_USUARIO (cd_usuario, nm_cliente, ds_email) 
VALUES (1,'joão silva', 'joaosilva22@gmail.com');


SELECT table_name FROM user_tables WHERE table_name LIKE 'T\_%' ESCAPE '\';

INSERT INTO t_usuarios (cd_usuario, nm_cliente, ds_email) 
VALUES (1,'joão silva', 'joaosilva22@gmail.com');

DESCRIBE t_conta;

INSERT INTO t_conta (cd_conta, ds_conta, dt_conta, tp_conta, vl_conta, cd_usuario)
VALUES (1, 'Conta Salario - CLT', TO_DATE('01/01/2026', 'DD/MM/YYYY'), 'Corrente', 1500.50, 1 );

DESCRIBE t_despesa;


INSERT INTO t_despesa (cd_despesa, ds_despesa, vl_despesa, dt_despesa, cd_usuario, ct_despesa)
VALUES (1, 'aluguel', 1200.00, TO_DATE('02/01/2026', 'DD/MM/YYYY'), 1, 'moradia');



DESCRIBE t_investimentos;

INSERT INTO t_investimentos (CD_INVESTIMENTO, DT_INVESTIMENTO, DS_INVESTIMENTO, CT_INVESTIMENTO, VL_INVESTIMENTO, CD_USUARIO )
VALUES (1, TO_DATE('02/02/2026', 'DD/MM/YYYY'), 'RENTABILIDADE', 'FUNDO', 18000.00,1);

DESCRIBE t_receita;
INSERT INTO t_receita(CD_RECEITA, DT_RECEITA, DS_RECEITA, CT_RECEITA, VL_RECEITA, CD_USUARIO)
VALUES (1, TO_DATE('02/02/2026', 'DD/MM/YYYY'),     'SALARIO', 'CLT', 3500, 1); 



--Boa prática sempre consultar antes o que desejo alterar co UPDATE.
SELECT * FROM t_conta;

--VOU ADICIONAR UMA SYSDATE NA DATE DE CONTA COM SYSDATE.
UPDATE t_conta
SET dt_conta = SYSDATE 
WHERE cd_conta=1 ;

COMMIT;




--BOAS PRÁTICAS E VER O QUE DESEJO ALTERAR COM O COMANDO SELECT.
SELECT * FROM t_usuarios;

--VOU ALTERAR O EMAIL DO USUARIO COM UPDATE 
UPDATE t_usuarios
SET ds_email = 'joaosilva.novo@gmail.com'
WHERE cd_usuario = 1;


COMMIT



--VOU FAZER AGORA UMA ALTERAÇÃO EM INVESTIMENTO VALOR INVESTIDO.
SELECT * FROM t_investimentos;


--VOU ALTERAR O VALOR INVESTIDO COM O COMANDO -> ROUND.
UPDATE t_investimentos
SET vl_investimento = ROUND( vl_investimento * 1.10, 2)
where cd_usuario=1  and cd_investimento = 1 ; 

COMMIT;



-- VOU FAZER UMA SUBCONSULTA EM RECEITA, PRA ISSO DEVO BUSCAR O QUE FOI FEITO EM RECEITA.
DESCRIBE T_RECEITA;

--VOU CONSULTAR O QUE DESEJO EM RECEITA.
SELECT * FROM t_receita;


--ACABEI DE FAZER A ALTERAÇÃO DE 'CLT' PARA 'FREELA'.
UPDATE t_receita
SET ct_receita = 'Freela'
WHERE cd_usuario = (SELECT cd_usuario FROM t_usuarios WHERE ds_email = 'joaosilva.novo@gmail.com')
AND cd_receita = 1;


COMMIT;



--consulta simples: buscar os dados de um usuário pelo código
SELECT cd_usuario, nm_cliente, ds_email
FROM t_usuarios
WHERE cd_usuario = 1;


COMMIT;


--consulta simples: buscar dados de conta pelo cadastro de conta
SELECT cd_conta,ds_conta, cd_usuario
FROM t_conta
WHERE cd_conta = 1;


COMMIT;



--consilta simples: Despesa - buscar dados de despesa pelo cadastro

SELECT cd_despesa, ds_despesa, vl_despesa, dt_despesa, cd_usuario
FROM t_despesa
WHERE cd_despesa = 1 AND cd_usuario = 1;

COMMIT;



--consulta simples: investimento - buncando dados de investimento do usuário
SELECT cd_investimento, dt_investimento, ds_investimento, ct_investimento, vl_investimento, cd_usuario
FROM t_investimentos
WHERE cd_investimento = 1 AND cd_usuario = 1 ;

COMMIT;

--consultando todas as despesas do usuário, ordenadas da mais recente à mais antiga
SELECT *
FROM t_despesa
WHERE cd_usuario = 1
ORDER BY dt_despesa DESC;


COMMIT;


--consultando todos os investimentos do usuário, ordenados do mais recente ao mais antigo
SELECT *
FROM t_investimentos
WHERE cd_usuario = 1
ORDER BY dt_investimento DESC

COMMIT;


--consulta dashboard: dados do usuário + última despesa + último investimento, em uma linha só
SELECT u.cd_usuario, u.nm_cliente, u.ds_email,
       d.ds_despesa, d.vl_despesa, d.dt_despesa,
       i.ds_investimento, i.vl_investimento, i.dt_investimento
FROM t_usuarios u
JOIN t_despesa d 
    ON d.cd_usuario = u.cd_usuario 
    AND d.dt_despesa = (SELECT MAX(dt_despesa) FROM t_despesa WHERE cd_usuario = u.cd_usuario)
JOIN t_investimentos i 
    ON i.cd_usuario = u.cd_usuario 
    AND i.dt_investimento = (SELECT MAX(dt_investimento) FROM t_investimentos WHERE cd_usuario = u.cd_usuario)
WHERE u.cd_usuario = 1;

COMMIT;

--comentário explicando
SELECT * FROM t_despesa;

--comentário da alteração
UPDATE t_despesa
SET vl_despesa = ...   -- ou outra coluna que você quiser alterar
WHERE cd_usuario = 1 AND cd_despesa = 1;

COMMIT;


--comentário explicando
SELECT * FROM t_despesa;

--alterando o valor da despesa
UPDATE t_despesa
SET vl_despesa = 1300.00
WHERE cd_usuario = 1 AND cd_despesa = 1;

COMMIT;
