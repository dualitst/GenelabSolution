using Genelab.Database.ComplexTypes;
using Genelab.Database.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace Genelab.Database.Data
{
    public class GenelabContext : IdentityDbContext<IdentityUser>
    {
		public GenelabContext(DbContextOptions options) : base(options)
		{
		}

		public DbSet<DatosFacturacion> DatosFacturacions { get; set; }
        public DbSet<Domicilio> Domicilios { get; set; }
        public DbSet<EstatusResultado> EstatusResultado { get; set; }
		public DbSet<EstatusPago> EstatusPago { get; set; }
		public DbSet<EstatusFactura> EstatusFactura { get; set; }
		public DbSet<EstatusProceso> EstatusProceso { get; set; }
		public DbSet<Estudio> Estudios { get; set; }
        public DbSet<Pago> Pagos { get; set; }
        public DbSet<Resultado> Resultados { get; set; }
        public DbSet<Servicio> Servicios { get; set; }
        public DbSet<ServicioDatosFacturacion> ServicioDatosFacturacions { get; set; }
        public DbSet<ServicioDetalle> ServicioDetalles { get; set; }

        public DbSet<ServicioEstudio> ServicioEstudios { get; set; }
        public DbSet<TipoServicio> TipoServicios { get; set; }
		public DbSet<Empresa> Empresas { get; set; }
		public DbSet<EstatusMuestra> EstatusMuestra { get; set; }
		

		// from stored procedures
		[NotMapped]
		public virtual DbSet<SelectResultList_Result> SelectResultList { get; set; }
		[NotMapped]
		public virtual DbSet<SelectPayList_Result> SelectPayList { get; set; }
		[NotMapped]
		public virtual DbSet<SelectSitioList_Result> SelectSitioList { get; set; }
		[NotMapped]
		public virtual DbSet<SelectDomicilioList_Result> SelectDomicilioList { get; set; }

		[NotMapped]
		public virtual DbSet<SelectFacturaList_Result> SelectFacturaList { get; set; }
		[NotMapped]
		public virtual DbSet<SelectMyList_Result> SelectMyList { get; set; }
		[NotMapped]
		public virtual DbSet<SelectMyBillList_Result> SelectMyBillList { get; set; }

		[NotMapped]
		public virtual DbSet<SelectMuestraList_Result> SelectMuestraList { get; set; }



		/// <summary>
		/// Metodo que genera el ORM de datos, para la entidad Anexo
		/// </summary>
		/// <param name="modelBuilder"></param>
		protected void MapPago(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<Pago>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<Pago>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<Pago>().Property(t => t.TipoPago).HasColumnName("TipoPago").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<Pago>().Property(t => t.Tarjeta).HasColumnName("Tarjeta").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<Pago>().Property(t => t.Monto).HasColumnName("Monto").HasColumnType("float").IsRequired();
			modelBuilder.Entity<Pago>().Property(t => t.ImagenId).HasColumnName("ImagenId").HasColumnType("varchar").IsRequired().HasMaxLength(50);

			modelBuilder.Entity<Pago>().ToTable("Pago");
		}
		protected void MapResultado(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<Resultado>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<Resultado>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<Resultado>().Property(t => t.Comentarios).HasColumnName("Comentarios").HasColumnType("varchar").IsRequired().HasMaxLength(250);
			modelBuilder.Entity<Resultado>().Property(t => t.ImagenId).HasColumnName("ImagenId").HasColumnType("varchar").IsRequired().HasMaxLength(50);

			modelBuilder.Entity<Resultado>().ToTable("Resultado");
		}
		protected void MapServicio(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<Servicio>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<Servicio>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			
			modelBuilder.Entity<Servicio>().Property(t => t.EstatusProcesoId).HasColumnName("EstatusProcesoId").HasColumnType("int").IsRequired();
			modelBuilder.Entity<Servicio>().Property(t => t.EstatusPagoId).HasColumnName("EstatusPagoId").HasColumnType("int").IsRequired();
			modelBuilder.Entity<Servicio>().Property(t => t.EstatusFacturaId).HasColumnName("EstatusFacturaId").HasColumnType("int").IsRequired();
			modelBuilder.Entity<Servicio>().Property(t => t.TipoServicioId).HasColumnName("TipoServicioId").HasColumnType("int").IsRequired();
			modelBuilder.Entity<Servicio>().Property(t => t.FolioPago).HasColumnName("FolioPago").HasColumnType("varchar").HasMaxLength(50);
			modelBuilder.Entity<Servicio>().Property(t => t.CodigoPostal).HasColumnName("CodigoPostal").HasColumnType("varchar").HasMaxLength(50);
			modelBuilder.Entity<Servicio>().Property(t => t.Colonia).HasColumnName("Colonia").HasColumnType("varchar").HasMaxLength(50);
			modelBuilder.Entity<Servicio>().Property(t => t.Delegacion).HasColumnName("Delegacion").HasColumnType("varchar").HasMaxLength(50);
			modelBuilder.Entity<Servicio>().Property(t => t.Estado).HasColumnName("Estado").HasColumnType("varchar").HasMaxLength(50);
			modelBuilder.Entity<Servicio>().Property(t => t.Pais).HasColumnName("Pais").HasColumnType("varchar").HasMaxLength(50);
			modelBuilder.Entity<Servicio>().Property(t => t.Calle).HasColumnName("Calle").HasColumnType("varchar").HasMaxLength(50);

			//DATOS PARA BITACORAS
			modelBuilder.Entity<Servicio>().Property(t => t.FechaHoraCreacion).HasColumnName("FechaHoraCreacion").HasColumnType("datetime").IsRequired();
			modelBuilder.Entity<Servicio>().Property(t => t.FechaHoraModificacion).HasColumnName("FechaHoraModificacion").HasColumnType("datetime").IsRequired();
			modelBuilder.Entity<Servicio>().Property(t => t.UsuarioCreacion).HasColumnName("UsuarioCreacion").HasColumnType("nvarchar").HasMaxLength(256);
			modelBuilder.Entity<Servicio>().Property(t => t.UsuarioModificacion).HasColumnName("UsuarioModificacion").HasColumnType("nvarchar").HasMaxLength(256);
			//DATOS PARA BITACORAS
			modelBuilder.Entity<Servicio>().Property(t => t.UsuarioIdPago).HasColumnName("UsuarioIdPago").HasColumnType("nvarchar").HasMaxLength(256);
			modelBuilder.Entity<Servicio>().Property(t => t.FechaHoraPago).HasColumnName("FechaHoraPago").HasColumnType("datetime");
			//DATOS PARA BITACORAS
			modelBuilder.Entity<Servicio>().Property(t => t.UsuarioIdFactura).HasColumnName("UsuarioIdFactura").HasColumnType("nvarchar").HasMaxLength(256);
			modelBuilder.Entity<Servicio>().Property(t => t.FechaHoraFactura).HasColumnName("FechaHoraFactura").HasColumnType("datetime");
			//DATOS PARA BITACORAS
			modelBuilder.Entity<Servicio>().Property(t => t.UsuarioIdPrepago).HasColumnName("UsuarioIdPrepago").HasColumnType("nvarchar").HasMaxLength(256);
			modelBuilder.Entity<Servicio>().Property(t => t.FechaHoraPrepago).HasColumnName("FechaHoraPrepago").HasColumnType("datetime");


			modelBuilder.Entity<Servicio>().ToTable("Servicio");
		}
		protected void MapDatosFacturacion(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<DatosFacturacion>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<DatosFacturacion>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<DatosFacturacion>().Property(t => t.EmpresaFiscal).HasColumnName("EmpresaFiscal").HasColumnType("varchar").IsRequired().HasMaxLength(250);
			modelBuilder.Entity<DatosFacturacion>().Property(t => t.CodigoPostal).HasColumnName("CodigoPostal").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<DatosFacturacion>().Property(t => t.Delegacion).HasColumnName("Delegacion").HasColumnType("varchar").IsRequired().HasMaxLength(150);
			modelBuilder.Entity<DatosFacturacion>().Property(t => t.Colonia).HasColumnName("Colonia").HasColumnType("varchar").IsRequired().HasMaxLength(150);
			modelBuilder.Entity<DatosFacturacion>().Property(t => t.RfcF).HasColumnName("RfcF").HasColumnType("varchar").IsRequired().HasMaxLength(250);
			modelBuilder.Entity<DatosFacturacion>().Property(t => t.EmailF).HasColumnName("EmailF").HasColumnType("varchar").HasMaxLength(250);
			modelBuilder.Entity<DatosFacturacion>().Property(t => t.TelF).HasColumnName("TelF").HasColumnType("varchar").HasMaxLength(250);
			modelBuilder.Entity<DatosFacturacion>().Property(t => t.TipoPersona).HasColumnName("TipoPersona").HasColumnType("varchar").HasMaxLength(250);

			modelBuilder.Entity<DatosFacturacion>().ToTable("DatosFacturacion");

		}

		protected void MapEmpresas(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<Empresa>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<Empresa>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<Empresa>().Property(t => t.EmpresaFiscal).HasColumnName("EmpresaFiscal").HasColumnType("varchar").IsRequired().HasMaxLength(250);
			modelBuilder.Entity<Empresa>().Property(t => t.CodigoPostal).HasColumnName("CodigoPostal").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<Empresa>().Property(t => t.Delegacion).HasColumnName("Delegacion").HasColumnType("varchar").IsRequired().HasMaxLength(150);
			modelBuilder.Entity<Empresa>().Property(t => t.Colonia).HasColumnName("Colonia").HasColumnType("varchar").IsRequired().HasMaxLength(150);
			modelBuilder.Entity<Empresa>().Property(t => t.RfcF).HasColumnName("RfcF").HasColumnType("varchar").IsRequired().HasMaxLength(250);
			modelBuilder.Entity<Empresa>().Property(t => t.EmailF).HasColumnName("EmailF").HasColumnType("varchar").HasMaxLength(250);
			modelBuilder.Entity<Empresa>().Property(t => t.TelF).HasColumnName("TelF").HasColumnType("varchar").HasMaxLength(250);

			modelBuilder.Entity<Empresa>().ToTable("Empresa");

		}
		protected void MapDomicilio(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<Domicilio>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<Domicilio>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<Domicilio>().Property(t => t.CodigoPostal).HasColumnName("CodigoPostal").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<Domicilio>().Property(t => t.DelegacionId).HasColumnName("DelegacionId").HasColumnType("int").IsRequired();
			modelBuilder.Entity<Domicilio>().Property(t => t.Colonia).HasColumnName("Colonia").HasColumnType("varchar").IsRequired().HasMaxLength(150);
			modelBuilder.Entity<Domicilio>().Property(t => t.Calle).HasColumnName("Calle").HasColumnType("varchar").IsRequired().HasMaxLength(250);
			modelBuilder.Entity<Domicilio>().Property(t => t.ServicioId).HasColumnName("ServicioId").HasColumnType("int").IsRequired();

			modelBuilder.Entity<Domicilio>().ToTable("Domicilio");
		}
		protected void MapEstatusPago(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<EstatusPago>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<EstatusPago>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<EstatusPago>().Property(t => t.Nombre).HasColumnName("Nombre").HasColumnType("varchar").IsRequired().HasMaxLength(50);

			modelBuilder.Entity<EstatusPago>().ToTable("EstatusPago");
		}

		protected void MapEstatusMuestra(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<EstatusMuestra>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<EstatusMuestra>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<EstatusMuestra>().Property(t => t.Nombre).HasColumnName("Nombre").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<EstatusMuestra>().ToTable("EstatusMuestra");
		}

		protected void MapEstatusProceso(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<EstatusProceso>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<EstatusProceso>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<EstatusProceso>().Property(t => t.Nombre).HasColumnName("Nombre").HasColumnType("varchar").IsRequired().HasMaxLength(50);

			modelBuilder.Entity<EstatusProceso>().ToTable("EstatusProceso");
		}

		protected void MapEstatusResultado(ModelBuilder modelBuilder)
        {
            //Se define campo que sera llave primaria
            modelBuilder.Entity<EstatusResultado>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
            modelBuilder.Entity<EstatusResultado>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

            //Se define el resto de los campos
            modelBuilder.Entity<EstatusResultado>().Property(t => t.Nombre).HasColumnName("Nombre").HasColumnType("varchar").IsRequired().HasMaxLength(50);

            modelBuilder.Entity<EstatusResultado>().ToTable("EstatusResultado");
        }

        protected void MapEstatusFactura(ModelBuilder modelBuilder)
        {
            //Se define campo que sera llave primaria
            modelBuilder.Entity<EstatusFactura>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
            modelBuilder.Entity<EstatusFactura>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los camposEstatusResultado
			modelBuilder.Entity<EstatusFactura>().Property(t => t.Nombre).HasColumnName("Nombre").HasColumnType("varchar").IsRequired().HasMaxLength(50);

            modelBuilder.Entity<EstatusFactura>().ToTable("EstatusFactura");
        }


        protected void MapEstudio(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<Estudio>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<Estudio>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<Estudio>().Property(t => t.Nombre).HasColumnName("Nombre").HasColumnType("varchar").IsRequired().HasMaxLength(150);
			modelBuilder.Entity<Estudio>().Property(t => t.Descripcion).HasColumnName("Descripcion").HasColumnType("varchar").IsRequired().HasMaxLength(500);
			modelBuilder.Entity<Estudio>().Property(t => t.Activo).HasColumnName("Activo").HasColumnType("bit").IsRequired();
			modelBuilder.Entity<Estudio>().Property(t => t.FechaHoraCreacion).HasColumnName("FechaHoraCreacion").HasColumnType("datetime").IsRequired();
			modelBuilder.Entity<Estudio>().Property(t => t.FechaHoraModificacion).HasColumnName("FechaHoraModificacion").HasColumnType("datetime").IsRequired();
			modelBuilder.Entity<Estudio>().Property(t => t.UsuarioCreacion).HasColumnName("UsuarioCreacion").HasColumnType("nvarchar").IsRequired().HasMaxLength(256);
			modelBuilder.Entity<Estudio>().Property(t => t.UsuarioModificacion).HasColumnName("UsuarioModificacion").HasColumnType("nvarchar").IsRequired().HasMaxLength(256);

			modelBuilder.Entity<Estudio>().ToTable("Estudio");
		}
		protected void MapServicioDatosFacturacion(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<ServicioDatosFacturacion>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<ServicioDatosFacturacion>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<ServicioDatosFacturacion>().Property(t => t.ServicioId).HasColumnName("ServicioId").HasColumnType("int").IsRequired();
			modelBuilder.Entity<ServicioDatosFacturacion>().Property(t => t.DatosFacturacionId).HasColumnName("DatosFacturacionId").HasColumnType("int").IsRequired();

			modelBuilder.Entity<ServicioDatosFacturacion>().ToTable("ServicioDatosFacturacion");
		}
		protected void MapServicioDetalle(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<ServicioDetalle>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.NombrePaciente).HasColumnName("NombrePaciente").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.ApellidoPPaciente).HasColumnName("ApellidoPPaciente").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.ApellidoMPaciente).HasColumnName("ApellidoMPaciente").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.NombreTitular).HasColumnName("NombreTitular").HasColumnType("varchar").HasMaxLength(50);
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.Parentezco).HasColumnName("Parentezco").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.Resultado).HasColumnName("Resultado").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.EstatusResultadoId).HasColumnName("EstatusResultadoId").HasColumnType("int").IsRequired();
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.UsuarioIdResultado).HasColumnName("UsuarioIdResultado").HasColumnType("nvarchar").HasMaxLength(256);
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.FechaHoraResultado).HasColumnName("FechaHoraResultado").HasColumnType("datetime");

			modelBuilder.Entity<ServicioDetalle>().Property(t => t.Ct).HasColumnName("Ct").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.AnioNacimiento).HasColumnName("AnioNacimiento").HasColumnType("datetime");
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.EstudioId).HasColumnName("EstudioId").HasColumnType("int").IsRequired();
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.UsuarioMuestraId).HasColumnName("UsuarioMuestraId").HasColumnType("nvarchar").HasMaxLength(256);
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.EstatusMuestraId).HasColumnName("EstatusMuestraId").HasColumnType("int");
			modelBuilder.Entity<ServicioDetalle>().Property(t => t.FechaHoraMuestra).HasColumnName("FechaHoraMuestra").HasColumnType("datetime");


			modelBuilder.Entity<ServicioDetalle>().ToTable("ServicioDetalle");
		}
		protected void MapServicioEstudio(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<ServicioEstudio>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<ServicioEstudio>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<ServicioEstudio>().Property(t => t.ServicioId).HasColumnName("ServicioId").HasColumnType("int").IsRequired();
			modelBuilder.Entity<ServicioEstudio>().Property(t => t.EstudioId).HasColumnName("EstudioId").HasColumnType("int").IsRequired();

			modelBuilder.Entity<ServicioEstudio>().ToTable("ServicioEstudio");
		}
		protected void MapTipoServicio(ModelBuilder modelBuilder)
		{
			//Se define campo que sera llave primaria
			modelBuilder.Entity<TipoServicio>().HasKey(k => k.Id); // Propiedad que sera la Llave Primaria
			modelBuilder.Entity<TipoServicio>().Property(t => t.Id).HasColumnName("Id").HasColumnType("int").UseIdentityColumn();

			//Se define el resto de los campos
			modelBuilder.Entity<TipoServicio>().Property(t => t.Nombre).HasColumnName("Nombre").HasColumnType("varchar").IsRequired().HasMaxLength(50);
			modelBuilder.Entity<TipoServicio>().Property(t => t.Activo).HasColumnName("Activo").HasColumnType("bit").IsRequired();

			modelBuilder.Entity<TipoServicio>().ToTable("TipoServicio");
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Pago>();
			modelBuilder.Entity<Resultado>();
			modelBuilder.Entity<Servicio>();
			modelBuilder.Entity<DatosFacturacion>();
			modelBuilder.Entity<Domicilio>();
			modelBuilder.Entity<EstatusProceso>();
			modelBuilder.Entity<EstatusPago>();
			modelBuilder.Entity<EstatusResultado>();
			modelBuilder.Entity<EstatusFactura>();
			modelBuilder.Entity<Estudio>();
			modelBuilder.Entity<DatosFacturacion>();
			modelBuilder.Entity<ServicioDetalle>();
			modelBuilder.Entity<ServicioEstudio>();
			modelBuilder.Entity<TipoServicio>();
			modelBuilder.Entity<Empresa>();
			modelBuilder.Entity<EstatusMuestra>();

			MapPago(modelBuilder);
            MapResultado(modelBuilder);
            MapServicio(modelBuilder);
            MapDatosFacturacion(modelBuilder);
            MapDomicilio(modelBuilder);
            MapEstatusPago(modelBuilder);
			MapEstatusResultado(modelBuilder);
			MapEstatusFactura(modelBuilder);
			MapEstatusProceso(modelBuilder);
			MapEstudio(modelBuilder);
            MapServicioDatosFacturacion(modelBuilder);
            MapServicioDetalle(modelBuilder);
            MapServicioEstudio(modelBuilder);
            MapTipoServicio(modelBuilder);
			MapEmpresas(modelBuilder);
			MapEstatusMuestra(modelBuilder);
		}

		


	}
}
