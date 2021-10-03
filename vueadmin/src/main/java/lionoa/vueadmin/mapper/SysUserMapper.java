package lionoa.vueadmin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import lionoa.vueadmin.entity.SysUser;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SysUserMapper extends BaseMapper<SysUser> {

	List<Long> getNavMenuIds(Long userId);

	List<SysUser> listByMenuId(Long menuId);
}
