namespace api.Models.Common
{
    public interface IAuditableEntity
    {
        public DateTimeOffset CreateAt { get; set; }
        public DateTimeOffset? UpdateAt { get; set; }
        public DateTimeOffset? DeleteAt { get; set; }

    }
}
