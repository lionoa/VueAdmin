package lionoa.vueadmin.service;

import com.baomidou.mybatisplus.extension.service.IService;
import lionoa.vueadmin.common.dto.SysMenuDto;
import lionoa.vueadmin.entity.SysMenu;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author 我的公众号：MarkerHub
 * @since 2021-04-05
 */
public interface SysMenuService extends IService<SysMenu> {

	List<SysMenuDto> getCurrentUserNav();

	List<SysMenu> tree();

}
