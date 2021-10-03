package lionoa.vueadmin.service;


import com.baomidou.mybatisplus.extension.service.IService;
import lionoa.vueadmin.entity.SysRole;

import java.util.List;

public interface SysRoleService extends IService<SysRole> {

	List<SysRole> listRolesByUserId(Long userId);

}
