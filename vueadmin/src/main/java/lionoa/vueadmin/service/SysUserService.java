package lionoa.vueadmin.service;


import com.baomidou.mybatisplus.extension.service.IService;
import lionoa.vueadmin.entity.SysUser;

public interface SysUserService extends IService<SysUser> {

	SysUser getByUsername(String username);

	String getUserAuthorityInfo(Long userId);

	void clearUserAuthorityInfo(String username);

	void clearUserAuthorityInfoByRoleId(Long roleId);

	void clearUserAuthorityInfoByMenuId(Long menuId);


}
