CREATE TABLE [dbo].[COUPONS] (
    [id]                  UNIQUEIDENTIFIER   NOT NULL,
    [code]                VARCHAR (50)       NOT NULL,
    [name]                VARCHAR (255)      NOT NULL,
    [scope]               VARCHAR (20)       NOT NULL,
    [category]            VARCHAR (20)       NOT NULL,
    [type]                VARCHAR (20)       NOT NULL,
    [discount_value]      DECIMAL (18, 2)    NOT NULL,
    [max_discount_amount] DECIMAL (18, 2)    NOT NULL,
    [min_order_value]     DECIMAL (18, 2)    NOT NULL,
    [total_quantity]      INT                NOT NULL,
    [used_quantity]       INT                NOT NULL,
    [start_at]            DATETIMEOFFSET (7) NOT NULL,
    [end_at]              DATETIMEOFFSET (7) NOT NULL,
    [status]              BIT                NOT NULL,
    [created_at]          DATETIMEOFFSET (7) DEFAULT (getdate()) NOT NULL,
    [updated_at]          DATETIMEOFFSET (7) DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_COUPONS] PRIMARY KEY CLUSTERED ([id] ASC)
);






GO
