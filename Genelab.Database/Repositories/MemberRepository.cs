using Genelab.Database.ComplexTypes;
using Genelab.Database.Data;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Genelab.Database.Repositories
{
    public class MemberRepository : IMemberRepository
    {
        private readonly GenelabContext _context;
        public MemberRepository(GenelabContext context)
        {
            _context = context;

        }

        public async Task<List<SelectResultList_Result>> SelectResultList()
        {
            List<SelectResultList_Result> members = new List<SelectResultList_Result>();
            var result = await _context.SelectResultList.FromSqlRaw($"SelectResultList").ToListAsync();
            return result;
        }

        public async Task<List<SelectPayList_Result>> SelectPayList()
        {
            List<SelectPayList_Result> members = new List<SelectPayList_Result>();
            var result = await _context.SelectPayList.FromSqlRaw($"SelectPayList").ToListAsync();
            return result;
        }
        

        public async Task<List<SelectSitioList_Result>> SelectSitioList()
        {
            List<SelectSitioList_Result> members = new List<SelectSitioList_Result>();
            var result = await _context.SelectSitioList.FromSqlRaw($"SelectSitioList").ToListAsync();
            return result;
        }

        public async Task<List<SelectDomicilioList_Result>> SelectDomicilioList()
        {
            List<SelectDomicilioList_Result> members = new List<SelectDomicilioList_Result>();
            var result = await _context.SelectDomicilioList.FromSqlRaw($"SelectDomicilioList").ToListAsync();
            return result;
        }

        public async Task<List<SelectFacturaList_Result>> SelectFacturaList()
        {
            List<SelectFacturaList_Result> members = new List<SelectFacturaList_Result>();
            var result = await _context.SelectFacturaList.FromSqlRaw($"SelectFacturaList").ToListAsync();
            return result;
        }

        public async Task<List<SelectMuestraList_Result>> SelectMuestraList()
        {
            List<SelectMuestraList_Result> members = new List<SelectMuestraList_Result>();
            var result = await _context.SelectMuestraList.FromSqlRaw($"SelectMuestraList").ToListAsync();
            return result;
        }
        public async Task<List<SelectMyList_Result>> SelectMyList(string usuario)
        {
            List<SelectMyList_Result> members = new List<SelectMyList_Result>();
            var usuarioId = new SqlParameter("@usuarioId", usuario);

            var result = await _context.SelectMyList.FromSqlRaw($"SelectMyList", usuarioId).ToListAsync();
            return result;
        }

        public async Task<List<SelectMyBillList_Result>> SelectMyBillList(string usuario)
        {
            List<SelectMyBillList_Result> members = new List<SelectMyBillList_Result>();
            var usuarioId = new SqlParameter("@usuarioId", usuario);

            var result = await _context.SelectMyBillList.FromSqlRaw($"SelectMyBill", usuarioId).ToListAsync();
            return result;
        }
    }
}
