using Microsoft.EntityFrameworkCore;
using Scheduler.Application.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Scheduler.Persistence.Repositories
{
    public class SchedulerRepository<T> : IRepository<T> where T : class
    {
        protected readonly SchedulerDbContext context;

        public SchedulerRepository(SchedulerDbContext context)
        {
            this.context = context;
        }

        public async Task Add(T entity)
        {
            context.Set<T>().Add(entity);
            await context.SaveChangesAsync();
        }

        public async Task AddRange(IEnumerable<T> entities)
        {
            context.Set<T>().AddRange(entities);
            await context.SaveChangesAsync();
        }

        public async Task<T> FirstOrDefault(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            var includeQuery = GetAllIncluding(includes);
            return await includeQuery.FirstOrDefaultAsync(predicate);
        }

        public async Task<IEnumerable<T>> GetAll(params Expression<Func<T, object>>[] includes)
        {
            var includeQuery = GetAllIncluding(includes);
            return await includeQuery.ToListAsync();
        }

        public async Task<IEnumerable<T>> GetAll(int page, int pageSize, params Expression<Func<T, object>>[] includes)
        {
            if (page < 1)
                throw new ArgumentOutOfRangeException("Page numbers start at 1.");

            var includeQuery = GetAllIncluding(includes);
            return await includeQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<T> GetById(int id)
        {
            return await context.Set<T>().FindAsync(id);
        }

        public async Task<IEnumerable<T>> GetWhere(Expression<Func<T, bool>> predicate, params Expression<Func<T, object>>[] includes)
        {
            var includeQuery = GetAllIncluding(includes);
            return await includeQuery
                .Where(predicate)
                .ToListAsync();
        }

        public async Task Remove(T entity)
        {
            context.Set<T>().Remove(entity);
            await context.SaveChangesAsync();
        }

        public async Task RemoveRange(IEnumerable<T> entities)
        {
            context.Set<T>().RemoveRange(entities);
            await context.SaveChangesAsync();
        }

        public async Task Update(T entity)
        {
            context.Entry(entity).State = EntityState.Modified;
            await context.SaveChangesAsync();
        }

        private IQueryable<T> GetAllIncluding(params Expression<Func<T, object>>[] includes)
        {
            var queryable = context.Set<T>().AsNoTracking();
            return includes.Aggregate(queryable, (current, includeProperty) => current.Include(includeProperty));
        }
    }
}
