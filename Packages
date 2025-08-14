-- ======================  ASSOCIATE  =======================
CREATE OR REPLACE PACKAGE pkg_associate_crud AS
    -- READ
    FUNCTION get_associates RETURN SYS_REFCURSOR;

    -- CREATE
    PROCEDURE create_associate(
        P_FIRST_NAME   IN VARCHAR2,
        P_LAST_NAME_1  IN VARCHAR2,
        P_LAST_NAME_2  IN VARCHAR2,
        P_NATIONAL_ID  IN VARCHAR2,
        P_EMAIL        IN VARCHAR2,
        P_PHONE        IN VARCHAR2,
        P_GROSS_SALARY IN NUMBER,
        P_ROLE_ID IN NUMBER,
        P_ENTRY_DATE IN DATE,
        P_LABORCONDITION_ID IN NUMBER
    );

    -- UPDATE
    PROCEDURE update_associate(
        P_ID           IN NUMBER,
        P_FIRST_NAME   IN VARCHAR2,
        P_LAST_NAME_1  IN VARCHAR2,
        P_LAST_NAME_2  IN VARCHAR2,
        P_NATIONAL_ID  IN VARCHAR2,
        P_EMAIL        IN VARCHAR2,
        P_PHONE        IN VARCHAR2,
        P_GROSS_SALARY IN NUMBER,
        P_ROLE_ID IN NUMBER,
        P_ENTRY_DATE IN DATE,
        P_LABORCONDITION_ID IN NUMBER
    );

    -- DELETE
    PROCEDURE delete_associate(
        P_ID IN NUMBER
    );
END pkg_associate_crud;
/

CREATE OR REPLACE PACKAGE BODY pkg_associate_crud AS
    FUNCTION get_associates RETURN SYS_REFCURSOR IS
        v_cursor SYS_REFCURSOR;
    BEGIN
        OPEN v_cursor FOR
            SELECT 
                ASSOCIATE_ID,
                ROLE_ID,
                LABORCONDITION_ID,
                NATIONAL_ID,
                FIRST_NAME,
                LAST_NAME_1,
                LAST_NAME_2,
                PROVINCE,
                CANTON,
                DISTRICT,
                BIRTH_DATE,
                MARITAL_STATUS,
                GENDER,
                PROFESSION,
                ENTRY_DATE,
                GROSS_SALARY,
                COMPANY,
                EMAIL,
                PASSWORD,
                PHONE
            FROM ASSOCIATE;
        RETURN v_cursor;
    END get_associates;

    PROCEDURE create_associate(
        P_FIRST_NAME   IN VARCHAR2,
        P_LAST_NAME_1  IN VARCHAR2,
        P_LAST_NAME_2  IN VARCHAR2,
        P_NATIONAL_ID  IN VARCHAR2,
        P_EMAIL        IN VARCHAR2,
        P_PHONE        IN VARCHAR2,
        P_GROSS_SALARY IN NUMBER,
        P_ROLE_ID IN NUMBER,
        P_ENTRY_DATE IN DATE,
        P_LABORCONDITION_ID IN NUMBER
    ) IS
    BEGIN
        INSERT INTO ASSOCIATE (
            FIRST_NAME, LAST_NAME_1, LAST_NAME_2,
            NATIONAL_ID, EMAIL, PHONE, GROSS_SALARY, ROLE_ID, ENTRY_DATE, LABORCONDITION_ID
        ) VALUES (
            P_FIRST_NAME, P_LAST_NAME_1, P_LAST_NAME_2,
            P_NATIONAL_ID, P_EMAIL, P_PHONE, P_GROSS_SALARY, P_ROLE_ID, P_ENTRY_DATE, P_LABORCONDITION_ID
        );
        COMMIT;
    END create_associate;

    PROCEDURE update_associate(
        P_ID           IN NUMBER,
        P_FIRST_NAME   IN VARCHAR2,
        P_LAST_NAME_1  IN VARCHAR2,
        P_LAST_NAME_2  IN VARCHAR2,
        P_NATIONAL_ID  IN VARCHAR2,
        P_EMAIL        IN VARCHAR2,
        P_PHONE        IN VARCHAR2,
        P_GROSS_SALARY IN NUMBER,
        P_ROLE_ID IN NUMBER,
        P_ENTRY_DATE IN DATE,
        P_LABORCONDITION_ID IN NUMBER
    ) IS
    BEGIN
        UPDATE ASSOCIATE
        SET
            FIRST_NAME   = P_FIRST_NAME,
            LAST_NAME_1  = P_LAST_NAME_1,
            LAST_NAME_2  = P_LAST_NAME_2,
            NATIONAL_ID  = P_NATIONAL_ID,
            EMAIL        = P_EMAIL,
            PHONE        = P_PHONE,
            GROSS_SALARY = P_GROSS_SALARY,
            ROLE_ID = P_ROLE_ID,
            ENTRY_DATE = P_ENTRY_DATE,
            LABORCONDITION_ID = P_LABORCONDITION_ID
        WHERE ASSOCIATE_ID = P_ID;
        COMMIT;
    END update_associate;

    PROCEDURE delete_associate(P_ID IN NUMBER) IS
    BEGIN
        DELETE FROM ASSOCIATE WHERE ASSOCIATE_ID = P_ID;
        COMMIT;
    END delete_associate;
END pkg_associate_crud;
/

-- =======================  LABOR_CONDITION  ======================= 
CREATE OR REPLACE PACKAGE pkg_labor_condition_crud AS
    -- READ
    FUNCTION get_labor_conditions RETURN SYS_REFCURSOR;

    PROCEDURE create_labor_condition(
        p_description IN LABOR_CONDITION.DESCRIPTION%TYPE
    );

    PROCEDURE update_labor_condition(
        p_condition_id IN LABOR_CONDITION.CONDITION_ID%TYPE,
        p_description  IN LABOR_CONDITION.DESCRIPTION%TYPE
    );

    PROCEDURE delete_labor_condition(
        p_condition_id IN LABOR_CONDITION.CONDITION_ID%TYPE
    );
END pkg_labor_condition_crud;
/

CREATE OR REPLACE PACKAGE BODY pkg_labor_condition_crud AS
    FUNCTION get_labor_conditions RETURN SYS_REFCURSOR IS
        v_cursor SYS_REFCURSOR;
    BEGIN
        OPEN v_cursor FOR
            SELECT CONDITION_ID, DESCRIPTION
            FROM LABOR_CONDITION;
        RETURN v_cursor;
    END get_labor_conditions;

    PROCEDURE create_labor_condition(p_description IN LABOR_CONDITION.DESCRIPTION%TYPE) IS
    BEGIN
        INSERT INTO LABOR_CONDITION (DESCRIPTION) VALUES (p_description);
        COMMIT;
    END create_labor_condition;

    PROCEDURE update_labor_condition(
        p_condition_id IN LABOR_CONDITION.CONDITION_ID%TYPE,
        p_description  IN LABOR_CONDITION.DESCRIPTION%TYPE
    ) IS
    BEGIN
        UPDATE LABOR_CONDITION
        SET DESCRIPTION = p_description
        WHERE CONDITION_ID = p_condition_id;
        COMMIT;
    END update_labor_condition;

    PROCEDURE delete_labor_condition(p_condition_id IN LABOR_CONDITION.CONDITION_ID%TYPE) IS
    BEGIN
        DELETE FROM LABOR_CONDITION WHERE CONDITION_ID = p_condition_id;
        COMMIT;
    END delete_labor_condition;
END pkg_labor_condition_crud;
/

-- =======================  ROLE  =======================
CREATE OR REPLACE PACKAGE pkg_role_crud AS
    -- READ
    FUNCTION get_roles RETURN SYS_REFCURSOR;

    PROCEDURE create_role(
        p_name        IN ROLE.NAME%TYPE,
        p_description IN ROLE.DESCRIPTION%TYPE
    );

    PROCEDURE update_role(
        p_role_id     IN ROLE.ROLE_ID%TYPE,
        p_name        IN ROLE.NAME%TYPE,
        p_description IN ROLE.DESCRIPTION%TYPE
    );

    PROCEDURE delete_role(p_role_id IN ROLE.ROLE_ID%TYPE);
END pkg_role_crud;
/

CREATE OR REPLACE PACKAGE BODY pkg_role_crud AS
    FUNCTION get_roles RETURN SYS_REFCURSOR IS
        v_cursor SYS_REFCURSOR;
    BEGIN
        OPEN v_cursor FOR
            SELECT ROLE_ID, NAME, DESCRIPTION
            FROM ROLE;
        RETURN v_cursor;
    END get_roles;

    PROCEDURE create_role(p_name IN ROLE.NAME%TYPE, p_description IN ROLE.DESCRIPTION%TYPE) IS
    BEGIN
        INSERT INTO ROLE (NAME, DESCRIPTION) VALUES (p_name, p_description);
        COMMIT;
    END create_role;

    PROCEDURE update_role(
        p_role_id IN ROLE.ROLE_ID%TYPE,
        p_name    IN ROLE.NAME%TYPE,
        p_description IN ROLE.DESCRIPTION%TYPE
    ) IS
    BEGIN
        UPDATE ROLE
        SET NAME = p_name, DESCRIPTION = p_description
        WHERE ROLE_ID = p_role_id;
        COMMIT;
    END update_role;

    PROCEDURE delete_role(p_role_id IN ROLE.ROLE_ID%TYPE) IS
    BEGIN
        DELETE FROM ROLE WHERE ROLE_ID = p_role_id;
        COMMIT;
    END delete_role;
END pkg_role_crud;
/


-- =======================  CREDIT_STATUS  ======================= 
CREATE OR REPLACE PACKAGE pkg_credit_status_crud AS
    -- READ
    FUNCTION get_credit_statuses RETURN SYS_REFCURSOR;

    PROCEDURE create_credit_status(p_description IN CREDIT_STATUS.DESCRIPTION%TYPE);
    PROCEDURE update_credit_status(p_status_id IN CREDIT_STATUS.STATUS_ID%TYPE, p_description IN CREDIT_STATUS.DESCRIPTION%TYPE);
    PROCEDURE delete_credit_status(p_status_id IN CREDIT_STATUS.STATUS_ID%TYPE);
END pkg_credit_status_crud;
/

CREATE OR REPLACE PACKAGE BODY pkg_credit_status_crud AS
    FUNCTION get_credit_statuses RETURN SYS_REFCURSOR IS
        v_cursor SYS_REFCURSOR;
    BEGIN
        OPEN v_cursor FOR
            SELECT STATUS_ID, DESCRIPTION
            FROM CREDIT_STATUS;
        RETURN v_cursor;
    END get_credit_statuses;

    PROCEDURE create_credit_status(p_description IN CREDIT_STATUS.DESCRIPTION%TYPE) IS
    BEGIN
        INSERT INTO CREDIT_STATUS (DESCRIPTION) VALUES (p_description);
        COMMIT;
    END create_credit_status;

    PROCEDURE update_credit_status(p_status_id IN CREDIT_STATUS.STATUS_ID%TYPE, p_description IN CREDIT_STATUS.DESCRIPTION%TYPE) IS
    BEGIN
        UPDATE CREDIT_STATUS
        SET DESCRIPTION = p_description
        WHERE STATUS_ID = p_status_id;
        COMMIT;
    END update_credit_status;

    PROCEDURE delete_credit_status(p_status_id IN CREDIT_STATUS.STATUS_ID%TYPE) IS
    BEGIN
        DELETE FROM CREDIT_STATUS WHERE STATUS_ID = p_status_id;
        COMMIT;
    END delete_credit_status;
END pkg_credit_status_crud;
/


-- =======================  SAVING_TYPE  =======================
CREATE OR REPLACE PACKAGE pkg_saving_type_crud AS
    -- READ
    FUNCTION get_saving_types RETURN SYS_REFCURSOR;

    PROCEDURE create_saving_type(p_name IN SAVING_TYPE.NAME%TYPE, p_description IN SAVING_TYPE.DESCRIPTION%TYPE);
    PROCEDURE update_saving_type(p_saving_type_id IN SAVING_TYPE.SAVING_TYPE_ID%TYPE, p_name IN SAVING_TYPE.NAME%TYPE, p_description IN SAVING_TYPE.DESCRIPTION%TYPE);
    PROCEDURE delete_saving_type(p_saving_type_id IN SAVING_TYPE.SAVING_TYPE_ID%TYPE);
END pkg_saving_type_crud;
/

CREATE OR REPLACE PACKAGE BODY pkg_saving_type_crud AS
    FUNCTION get_saving_types RETURN SYS_REFCURSOR IS
        v_cursor SYS_REFCURSOR;
    BEGIN
        OPEN v_cursor FOR
            SELECT SAVING_TYPE_ID, NAME, DESCRIPTION
            FROM SAVING_TYPE;
        RETURN v_cursor;
    END get_saving_types;

    PROCEDURE create_saving_type(p_name IN SAVING_TYPE.NAME%TYPE, p_description IN SAVING_TYPE.DESCRIPTION%TYPE) IS
    BEGIN
        INSERT INTO SAVING_TYPE (NAME, DESCRIPTION) VALUES (p_name, p_description);
        COMMIT;
    END create_saving_type;

    PROCEDURE update_saving_type(
        p_saving_type_id IN SAVING_TYPE.SAVING_TYPE_ID%TYPE,
        p_name           IN SAVING_TYPE.NAME%TYPE,
        p_description    IN SAVING_TYPE.DESCRIPTION%TYPE
    ) IS
    BEGIN
        UPDATE SAVING_TYPE
        SET NAME = p_name, DESCRIPTION = p_description
        WHERE SAVING_TYPE_ID = p_saving_type_id;
        COMMIT;
    END update_saving_type;

    PROCEDURE delete_saving_type(p_saving_type_id IN SAVING_TYPE.SAVING_TYPE_ID%TYPE) IS
    BEGIN
        DELETE FROM SAVING_TYPE WHERE SAVING_TYPE_ID = p_saving_type_id;
        COMMIT;
    END delete_saving_type;
END pkg_saving_type_crud;
/

-- =======================  BENEFICIARY  =======================
CREATE OR REPLACE PACKAGE pkg_beneficiary_crud AS
    -- READ
    FUNCTION get_beneficiaries RETURN SYS_REFCURSOR;

    PROCEDURE create_beneficiary(
        p_associate_id IN NUMBER,
        p_first_name   IN VARCHAR2,
        p_last_name_1  IN VARCHAR2,
        p_last_name_2  IN VARCHAR2,
        p_relationship IN VARCHAR2,
        p_percentage   IN NUMBER,
        p_email        IN VARCHAR2,
        p_phone        IN VARCHAR2
    );

    PROCEDURE update_beneficiary(
        p_beneficiary_id IN NUMBER,
        p_associate_id   IN NUMBER,
        p_first_name     IN VARCHAR2,
        p_last_name_1    IN VARCHAR2,
        p_last_name_2    IN VARCHAR2,
        p_relationship   IN VARCHAR2,
        p_percentage     IN NUMBER,
        p_email          IN VARCHAR2,
        p_phone          IN VARCHAR2
    );

    PROCEDURE delete_beneficiary(p_id IN NUMBER);
END pkg_beneficiary_crud;
/

CREATE OR REPLACE PACKAGE BODY pkg_beneficiary_crud AS
    FUNCTION get_beneficiaries RETURN SYS_REFCURSOR IS
        v_cursor SYS_REFCURSOR;
    BEGIN
        OPEN v_cursor FOR
            SELECT
                BENEFICIARY_ID,
                ASSOCIATE_ID,
                FIRST_NAME,
                LAST_NAME_1,
                LAST_NAME_2,
                NATIONAL_ID,
                GENDER,
                RELATIONSHIP,
                PERCENTAGE,
                PROVINCE,
                CANTON,
                DISTRICT,
                EMAIL,
                PHONE
            FROM BENEFICIARY;
        RETURN v_cursor;
    END get_beneficiaries;

    PROCEDURE create_beneficiary(
        p_associate_id IN NUMBER,
        p_first_name   IN VARCHAR2,
        p_last_name_1  IN VARCHAR2,
        p_last_name_2  IN VARCHAR2,
        p_relationship IN VARCHAR2,
        p_percentage   IN NUMBER,
        p_email        IN VARCHAR2,
        p_phone        IN VARCHAR2
    ) IS
    BEGIN
        INSERT INTO BENEFICIARY (
            ASSOCIATE_ID, FIRST_NAME, LAST_NAME_1, LAST_NAME_2,
            RELATIONSHIP, PERCENTAGE, EMAIL, PHONE
        ) VALUES (
            p_associate_id, p_first_name, p_last_name_1, p_last_name_2,
            p_relationship, p_percentage, p_email, p_phone
        );
        COMMIT;
    END create_beneficiary;

    PROCEDURE update_beneficiary(
        p_beneficiary_id IN NUMBER,
        p_associate_id   IN NUMBER,
        p_first_name     IN VARCHAR2,
        p_last_name_1    IN VARCHAR2,
        p_last_name_2    IN VARCHAR2,
        p_relationship   IN VARCHAR2,
        p_percentage     IN NUMBER,
        p_email          IN VARCHAR2,
        p_phone          IN VARCHAR2
    ) IS
    BEGIN
        UPDATE BENEFICIARY
        SET
            ASSOCIATE_ID = p_associate_id,
            FIRST_NAME   = p_first_name,
            LAST_NAME_1  = p_last_name_1,
            LAST_NAME_2  = p_last_name_2,
            RELATIONSHIP = p_relationship,
            PERCENTAGE   = p_percentage,
            EMAIL        = p_email,
            PHONE        = p_phone
        WHERE BENEFICIARY_ID = p_beneficiary_id;
        COMMIT;
    END update_beneficiary;

    PROCEDURE delete_beneficiary(p_id IN NUMBER) IS
    BEGIN
        DELETE FROM BENEFICIARY WHERE BENEFICIARY_ID = p_id;
        COMMIT;
    END delete_beneficiary;
END pkg_beneficiary_crud;
/

-- =======================  CREDIT  =======================
CREATE OR REPLACE PACKAGE pkg_credit_crud AS
    -- READ
    FUNCTION get_credits RETURN SYS_REFCURSOR;

    -- CREATE: usa REQUEST_DATE (no APPROVAL_DATE) y agrega TERM_MONTHS
    PROCEDURE create_credit(
        p_associate_id     IN NUMBER,
        p_name             IN VARCHAR2,
        p_requested_amount IN NUMBER,
        p_term_months      IN NUMBER,
        p_current_balance  IN NUMBER,
        p_monthly_payment  IN NUMBER,
        p_interest_rate    IN NUMBER,
        p_request_date     IN DATE,
        p_credit_status_id IN NUMBER
    );

    -- UPDATE: agrega TERM_MONTHS, mantiene APPROVAL_DATE
    PROCEDURE update_credit(
        p_credit_id        IN NUMBER,
        p_associate_id     IN NUMBER,
        p_name             IN VARCHAR2,
        p_requested_amount IN NUMBER,
        p_term_months      IN NUMBER,
        p_current_balance  IN NUMBER,
        p_monthly_payment  IN NUMBER,
        p_interest_rate    IN NUMBER,
        p_approval_date    IN DATE,
        p_credit_status_id IN NUMBER
    );

    PROCEDURE delete_credit(p_id IN NUMBER);
END pkg_credit_crud;
/


CREATE OR REPLACE PACKAGE BODY pkg_credit_crud AS
    FUNCTION get_credits RETURN SYS_REFCURSOR IS
        v_cursor SYS_REFCURSOR;
    BEGIN
        OPEN v_cursor FOR
            SELECT
                CREDIT_ID,
                ASSOCIATE_ID,
                NAME,
                REQUESTED_AMOUNT,
                TERM_MONTHS,
                CURRENT_BALANCE,
                MONTHLY_PAYMENT,
                INTEREST_RATE,
                REQUEST_DATE,
                APPROVAL_DATE,
                CREDIT_STATUS_ID
            FROM CREDIT;
        RETURN v_cursor;
    END get_credits;

    -- CREATE con TERM_MONTHS y REQUEST_DATE
    PROCEDURE create_credit(
        p_associate_id     IN NUMBER,
        p_name             IN VARCHAR2,
        p_requested_amount IN NUMBER,
        p_term_months      IN NUMBER,
        p_current_balance  IN NUMBER,
        p_monthly_payment  IN NUMBER,
        p_interest_rate    IN NUMBER,
        p_request_date     IN DATE,
        p_credit_status_id IN NUMBER
    ) IS
    BEGIN
        INSERT INTO CREDIT (
            ASSOCIATE_ID, NAME, REQUESTED_AMOUNT, TERM_MONTHS,
            CURRENT_BALANCE, MONTHLY_PAYMENT,
            INTEREST_RATE, REQUEST_DATE, CREDIT_STATUS_ID
        ) VALUES (
            p_associate_id, p_name, p_requested_amount, p_term_months,
            p_current_balance, p_monthly_payment,
            p_interest_rate, p_request_date, p_credit_status_id
        );
        COMMIT;
    END create_credit;

    -- UPDATE con TERM_MONTHS y mantiene APPROVAL_DATE
    PROCEDURE update_credit(
        p_credit_id        IN NUMBER,
        p_associate_id     IN NUMBER,
        p_name             IN VARCHAR2,
        p_requested_amount IN NUMBER,
        p_term_months      IN NUMBER,
        p_current_balance  IN NUMBER,
        p_monthly_payment  IN NUMBER,
        p_interest_rate    IN NUMBER,
        p_approval_date    IN DATE,
        p_credit_status_id IN NUMBER
    ) IS
    BEGIN
        UPDATE CREDIT
            SET ASSOCIATE_ID     = p_associate_id,
                NAME             = p_name,
                REQUESTED_AMOUNT = p_requested_amount,
                TERM_MONTHS      = p_term_months,
                CURRENT_BALANCE  = p_current_balance,
                MONTHLY_PAYMENT  = p_monthly_payment,
                INTEREST_RATE    = p_interest_rate,
                APPROVAL_DATE    = p_approval_date,
                CREDIT_STATUS_ID = p_credit_status_id
            WHERE CREDIT_ID = p_credit_id;
        COMMIT;
    END update_credit;

    PROCEDURE delete_credit(p_id IN NUMBER) IS
    BEGIN
        DELETE FROM CREDIT WHERE CREDIT_ID = p_id;
        COMMIT;
    END delete_credit;
END pkg_credit_crud;
/


--  =======================  SAVING  ======================= 
CREATE OR REPLACE PACKAGE pkg_saving_crud AS
    -- READ
    FUNCTION get_savings RETURN SYS_REFCURSOR;

    PROCEDURE create_saving(
        p_associate_id    IN NUMBER,
        p_name            IN VARCHAR2,
        p_current_balance IN NUMBER,
        p_monthly_amount  IN NUMBER,
        p_interest_rate   IN NUMBER,
        p_deadline        IN DATE,
        p_generated_interes IN NUMBER,
        p_saving_type_id IN NUMBER
    );

    PROCEDURE update_saving(
        p_saving_id       IN NUMBER,
        p_associate_id    IN NUMBER,
        p_name            IN VARCHAR2,
        p_current_balance IN NUMBER,
        p_monthly_amount  IN NUMBER,
        p_interest_rate   IN NUMBER,
        p_deadline        IN DATE,
        p_generated_interes IN NUMBER,
        p_saving_type_id IN NUMBER
    );

    PROCEDURE delete_saving(p_id IN NUMBER);
END pkg_saving_crud;
/

CREATE OR REPLACE PACKAGE BODY pkg_saving_crud AS
    FUNCTION get_savings RETURN SYS_REFCURSOR IS
        v_cursor SYS_REFCURSOR;
    BEGIN
        OPEN v_cursor FOR
            SELECT
                SAVING_ID,
                ASSOCIATE_ID,
                NAME,
                CURRENT_BALANCE,
                MONTHLY_AMOUNT,
                GENERATED_INTEREST,
                INTEREST_RATE,
                SAVING_TYPE_ID,
                DEADLINE
            FROM SAVING;
        RETURN v_cursor;
    END get_savings;

    PROCEDURE create_saving(
        p_associate_id    IN NUMBER,
        p_name            IN VARCHAR2,
        p_current_balance IN NUMBER,
        p_monthly_amount  IN NUMBER,
        p_interest_rate   IN NUMBER,
        p_deadline        IN DATE,
        p_generated_interes IN NUMBER,
        p_saving_type_id IN NUMBER
    ) IS
    BEGIN
        INSERT INTO SAVING (
            ASSOCIATE_ID, NAME, CURRENT_BALANCE,
            MONTHLY_AMOUNT, INTEREST_RATE, DEADLINE, GENERATED_INTEREST, SAVING_TYPE_ID
        ) VALUES (
            p_associate_id, p_name, p_current_balance, 
            p_monthly_amount, p_interest_rate, p_deadline, p_generated_interes, p_saving_type_id
        );
        COMMIT;
    END create_saving;

    PROCEDURE update_saving(
        p_saving_id       IN NUMBER,
        p_associate_id    IN NUMBER,
        p_name            IN VARCHAR2,
        p_current_balance IN NUMBER,
        p_monthly_amount  IN NUMBER,
        p_interest_rate   IN NUMBER,
        p_deadline        IN DATE,
        p_generated_interes IN NUMBER,
        p_saving_type_id IN NUMBER
    ) IS
    BEGIN
        UPDATE SAVING
        SET
            ASSOCIATE_ID    = p_associate_id,
            NAME            = p_name,
            CURRENT_BALANCE = p_current_balance,
            MONTHLY_AMOUNT  = p_monthly_amount,
            INTEREST_RATE   = p_interest_rate,
            DEADLINE        = p_deadline,
            GENERATED_INTEREST = p_generated_interes,
            SAVING_TYPE_ID = p_saving_type_id
        WHERE SAVING_ID = p_saving_id;
        COMMIT;
    END update_saving;

    PROCEDURE delete_saving(p_id IN NUMBER) IS
    BEGIN
        DELETE FROM SAVING WHERE SAVING_ID = p_id;
        COMMIT;
    END delete_saving;
END pkg_saving_crud;
/

--  =======================  WITHDRAWAL  ======================= 
CREATE OR REPLACE PACKAGE pkg_withdrawal AS
    -- Tipo de registro para un retiro
    TYPE withdrawal_rec IS RECORD (
        withdrawal_id    withdrawal.withdrawal_id%TYPE,
        saving_id        withdrawal.saving_id%TYPE,
        amount           withdrawal.amount%TYPE,
        date_withdrawal  withdrawal.date_withdrawal%TYPE
    );

    -- Cursor que siempre trae todos los retiros
    CURSOR c_get_withdrawals IS
        SELECT withdrawal_id, saving_id, amount, date_withdrawal
        FROM withdrawal;

    -- Función para obtener todos los retiros como cursor
    FUNCTION get_withdrawals RETURN SYS_REFCURSOR;

    -- Procedimiento para insertar un retiro
    PROCEDURE insert_withdrawal(
        p_saving_id        IN NUMBER,
        p_amount           IN NUMBER,
        p_date_withdrawal  IN DATE
    );

    -- Procedimiento para actualizar un retiro
    PROCEDURE update_withdrawal(
        p_withdrawal_id    IN NUMBER,
        p_saving_id        IN NUMBER,
        p_amount           IN NUMBER,
        p_date_withdrawal  IN DATE
    );

    -- Procedimiento para eliminar un retiro
    PROCEDURE delete_withdrawal(
        p_withdrawal_id    IN NUMBER
    );
END pkg_withdrawal;
/

CREATE OR REPLACE PACKAGE BODY pkg_withdrawal AS

    FUNCTION get_withdrawals RETURN SYS_REFCURSOR IS
        v_cursor SYS_REFCURSOR;
    BEGIN
        OPEN v_cursor FOR
        SELECT withdrawal_id,
                saving_id,
                amount,
                date_withdrawal
        FROM withdrawal;
        RETURN v_cursor;
    END get_withdrawals;

        PROCEDURE insert_withdrawal(
        p_saving_id        IN NUMBER,
        p_amount           IN NUMBER,
        p_date_withdrawal  IN DATE
        ) IS
        BEGIN
        -- Descontar del saldo actual
        UPDATE saving
            SET current_balance = current_balance - p_amount
        WHERE saving_id = p_saving_id;
        
        -- Registrar el retiro
        INSERT INTO withdrawal (saving_id, amount, date_withdrawal)
        VALUES (p_saving_id, p_amount, p_date_withdrawal);
        
        COMMIT;
        END insert_withdrawal;


    PROCEDURE update_withdrawal(
        p_withdrawal_id    IN NUMBER,
        p_saving_id        IN NUMBER,
        p_amount           IN NUMBER,
        p_date_withdrawal  IN DATE
    ) IS
    BEGIN
        UPDATE withdrawal
        SET saving_id = p_saving_id,
            amount = p_amount,
            date_withdrawal = p_date_withdrawal
        WHERE withdrawal_id = p_withdrawal_id;
        COMMIT;
    END update_withdrawal;

    PROCEDURE delete_withdrawal(
        p_withdrawal_id    IN NUMBER
    ) IS
    BEGIN
        DELETE FROM withdrawal
        WHERE withdrawal_id = p_withdrawal_id;
        COMMIT;
    END delete_withdrawal;

END pkg_withdrawal;
/

--  =======================  SAVING CONTRIBUTION  ======================= 

CREATE OR REPLACE PACKAGE pkg_saving_contribution AS
    -- Tipo de registro para Saving_Contribution
    TYPE saving_contribution_rec IS RECORD (
        contribution_id       saving_contribution.contribution_id%TYPE,
        saving_id              saving_contribution.saving_id%TYPE,
        amount                 saving_contribution.amount%TYPE,
        date_contribution      saving_contribution.date_saving_contribution%TYPE
    );

    -- Cursor para obtener todos los aportes
    CURSOR c_get_contributions IS
        SELECT contribution_id, saving_id, amount, date_saving_contribution
        FROM saving_contribution;

    -- Función para obtener todos los aportes (Read) usando cursor
    FUNCTION get_contributions RETURN SYS_REFCURSOR;

    -- Procedimiento para insertar un nuevo aporte (Create) usando cursor
    PROCEDURE insert_contribution(
        p_saving_id         IN NUMBER,
        p_amount            IN NUMBER,
        p_date_contribution IN DATE
    );

    -- Procedimiento para actualizar un aporte (Update) sin cursor
    PROCEDURE update_contribution(
        p_contribution_id   IN NUMBER,
        p_saving_id         IN NUMBER,
        p_amount            IN NUMBER,
        p_date_contribution IN DATE
    );

    -- Procedimiento para eliminar un aporte (Delete) sin cursor
    PROCEDURE delete_contribution(
        p_contribution_id   IN NUMBER
    );

END pkg_saving_contribution;
/

CREATE OR REPLACE PACKAGE BODY pkg_saving_contribution AS

    FUNCTION get_contributions RETURN SYS_REFCURSOR IS
        v_cursor SYS_REFCURSOR;
    BEGIN
        OPEN v_cursor FOR
        SELECT contribution_id,
                saving_id,
                amount,
                date_saving_contribution
        FROM saving_contribution;
        RETURN v_cursor;
    END get_contributions;

        PROCEDURE insert_contribution(
        p_saving_id         IN NUMBER,
        p_amount            IN NUMBER,
        p_date_contribution IN DATE
        ) IS
        v_new_id NUMBER;
        BEGIN
        -- Actualiza el saldo acumulando el aporte
        UPDATE saving
            SET current_balance = NVL(current_balance, 0) + p_amount
        WHERE saving_id = p_saving_id;
        
        -- Registra el aporte
        INSERT INTO saving_contribution (saving_id, amount, date_saving_contribution)
        VALUES (p_saving_id, p_amount, p_date_contribution)
        RETURNING contribution_id INTO v_new_id;
        
        COMMIT;
        END insert_contribution;


    PROCEDURE update_contribution(
        p_contribution_id   IN NUMBER,
        p_saving_id         IN NUMBER,
        p_amount            IN NUMBER,
        p_date_contribution IN DATE
    ) IS
    BEGIN
        UPDATE saving_contribution
        SET saving_id = p_saving_id,
            amount = p_amount,
            date_saving_contribution = p_date_contribution
        WHERE contribution_id = p_contribution_id;

        COMMIT;
    END update_contribution;

    PROCEDURE delete_contribution(
        p_contribution_id   IN NUMBER
    ) IS
    BEGIN
        DELETE FROM saving_contribution
        WHERE contribution_id = p_contribution_id;

        COMMIT;
    END delete_contribution;

END pkg_saving_contribution;
/

--  =======================  CREDIT CONTRIBUTION  ======================= 

CREATE OR REPLACE PACKAGE pkg_credit_contribution AS
    -- Tipo de registro para credit_contribution
    TYPE credit_contribution_rec IS RECORD (
        contribution_id    credit_contribution.contribution_id%TYPE,
        credit_id          credit_contribution.credit_id%TYPE,
        amount             credit_contribution.amount%TYPE,
        date_contribution  credit_contribution.date_credit_contribution%TYPE
    );

    -- Cursor para obtener todos los aportes
    CURSOR c_get_contributions IS
        SELECT contribution_id, credit_id, amount, date_credit_contribution
        FROM credit_contribution;

    -- Función para obtener todos los aportes (Read) usando cursor
    FUNCTION get_contributions RETURN SYS_REFCURSOR;

    -- Procedimiento para insertar un nuevo aporte (Create)
    PROCEDURE insert_contribution(
        p_credit_id         IN NUMBER,
        p_amount            IN NUMBER,
        p_date_contribution IN DATE
    );

    -- Funcion para actualizar un aporte (Update)
    FUNCTION update_contribution(
        p_contribution_id   IN NUMBER,
        p_credit_id         IN NUMBER,
        p_amount            IN NUMBER,
        p_date_contribution IN DATE
    ) RETURN NUMBER;

    -- Procedimiento para eliminar un aporte (Delete)
    PROCEDURE delete_contribution(
        p_contribution_id   IN NUMBER
    );

END pkg_credit_contribution;
/

CREATE OR REPLACE PACKAGE BODY pkg_credit_contribution AS

    FUNCTION get_contributions RETURN SYS_REFCURSOR IS
        v_cursor SYS_REFCURSOR;
    BEGIN
        OPEN v_cursor FOR
        SELECT contribution_id,
                credit_id,
                amount,
                date_credit_contribution
        FROM credit_contribution;
        RETURN v_cursor;
    END get_contributions;

    PROCEDURE insert_contribution(
        p_credit_id         IN NUMBER,
        p_amount            IN NUMBER,
        p_date_contribution IN DATE
    ) IS
        v_new_id NUMBER;
    BEGIN
        INSERT INTO credit_contribution (credit_id, amount, date_credit_contribution)
        VALUES (p_credit_id, p_amount, p_date_contribution)
        RETURNING contribution_id INTO v_new_id;
        COMMIT;
    END insert_contribution;

    FUNCTION update_contribution (
            p_contribution_id   IN NUMBER,
            p_credit_id         IN NUMBER,
            p_amount            IN NUMBER,
            p_date_contribution IN DATE
        ) RETURN NUMBER
        IS
            -- Cursor explícito para seleccionar la fila a actualizar
            CURSOR c_contrib IS
                SELECT contribution_id, credit_id, amount, date_credit_contribution
                FROM credit_contribution
                WHERE contribution_id = p_contribution_id
                FOR UPDATE;
        
            v_rec c_contrib%ROWTYPE;
        BEGIN
            OPEN c_contrib;
            FETCH c_contrib INTO v_rec;
        
            IF c_contrib%FOUND THEN
                -- Actualizamos la fila usando WHERE CURRENT OF
                UPDATE credit_contribution
                SET credit_id = p_credit_id,
                    amount = p_amount,
                    date_credit_contribution = p_date_contribution
                WHERE CURRENT OF c_contrib;
        
                COMMIT;
                CLOSE c_contrib;
        
                RETURN 1; -- Actualización exitosa
            ELSE
                CLOSE c_contrib;
                RETURN 0; -- No se encontró el registro
            END IF;
        EXCEPTION
            WHEN OTHERS THEN
                CLOSE c_contrib;
                RAISE;
        END update_contribution;


    PROCEDURE delete_contribution(
        p_contribution_id   IN NUMBER
    ) IS
    BEGIN
        DELETE FROM credit_contribution
        WHERE contribution_id = p_contribution_id;
        COMMIT;
    END delete_contribution;

END pkg_credit_contribution;
/

